import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import StudentProfileSettingsForm from './StudentProfileSettingsForm';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Fill every field with valid data, optionally overriding specific fields. */
async function fillForm(user, overrides = {}) {
  const defaults = {
    fullName: 'Ayesha Khan',
    email: 'ayesha@uni.edu',
    cgpa: '3.5',
    familyIncome: '600000',
    degreeProgram: 'BS',
    semester: '3',
  };
  const values = { ...defaults, ...overrides };

  // Full Name
  if (values.fullName !== undefined) {
    const el = screen.getByLabelText(/full name/i);
    await user.clear(el);
    if (values.fullName !== '') await user.type(el, values.fullName);
  }

  // Email
  if (values.email !== undefined) {
    const el = screen.getByLabelText(/email address/i);
    await user.clear(el);
    if (values.email !== '') await user.type(el, values.email);
  }

  // CGPA
  if (values.cgpa !== undefined) {
    const el = screen.getByLabelText(/cgpa/i);
    await user.clear(el);
    if (values.cgpa !== '') await user.type(el, values.cgpa);
  }

  // Family Income
  if (values.familyIncome !== undefined) {
    const el = screen.getByLabelText(/annual family income/i);
    await user.clear(el);
    if (values.familyIncome !== '') await user.type(el, values.familyIncome);
  }

  // Degree Program (select)
  if (values.degreeProgram !== undefined) {
    const el = screen.getByLabelText(/degree program/i);
    await user.selectOptions(el, values.degreeProgram);
  }

  // Semester
  if (values.semester !== undefined) {
    const el = screen.getByLabelText(/current semester/i);
    await user.clear(el);
    if (values.semester !== '') await user.type(el, values.semester);
  }
}

/** Submit the form and wait for validation pass/fail. */
async function submitForm(user) {
  await user.click(screen.getByRole('button', { name: /save changes/i }));
}

// ─── Test suite ───────────────────────────────────────────────────────────────

describe('StudentProfileSettingsForm', () => {

  // ── Required field validation ───────────────────────────────────────────────

  describe('Required field validation', () => {
    it('shows an error for an empty Full Name on submit', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      // Submit without typing anything
      await submitForm(user);
      await waitFor(() => {
        expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      });
    });

    it('shows an error for an empty Email on submit', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      await submitForm(user);
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it('shows an error for an empty CGPA on submit', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      await submitForm(user);
      await waitFor(() => {
        expect(screen.getByText(/cgpa is required/i)).toBeInTheDocument();
      });
    });

    it('shows an error for an empty Family Income on submit', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      await submitForm(user);
      await waitFor(() => {
        expect(screen.getByText(/family income is required/i)).toBeInTheDocument();
      });
    });

    it('shows an error when no Degree Program is selected on submit', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      await submitForm(user);
      await waitFor(() => {
        expect(screen.getByText(/please select a degree program/i)).toBeInTheDocument();
      });
    });

    it('shows an error for an empty Semester on submit', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      await submitForm(user);
      await waitFor(() => {
        expect(screen.getByText(/semester is required/i)).toBeInTheDocument();
      });
    });

    it('shows a min-length error when Full Name is fewer than 3 characters', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const el = screen.getByLabelText(/full name/i);
      await user.type(el, 'AB');
      await user.tab(); // trigger onBlur
      await waitFor(() => {
        expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
      });
    });
  });

  // ── CGPA range validation ────────────────────────────────────────────────────

  describe('CGPA range validation', () => {
    it('accepts 0.0 as a valid CGPA boundary', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<StudentProfileSettingsForm onSubmit={onSubmit} />);
      await fillForm(user, { cgpa: '0.0' });
      await submitForm(user);
      await waitFor(() => expect(onSubmit).toHaveBeenCalled());
      expect(screen.queryByText(/cgpa must/i)).not.toBeInTheDocument();
    });

    it('accepts 4.0 as a valid CGPA boundary', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<StudentProfileSettingsForm onSubmit={onSubmit} />);
      await fillForm(user, { cgpa: '4.0' });
      await submitForm(user);
      await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    });

    it('rejects a CGPA below 0.0', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const el = screen.getByLabelText(/cgpa/i);
      await user.type(el, '-0.5');
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/cgpa must be at least 0\.0/i)).toBeInTheDocument();
      });
    });

    it('rejects a CGPA above 4.0', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const el = screen.getByLabelText(/cgpa/i);
      await user.type(el, '4.1');
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/cgpa must not exceed 4\.0/i)).toBeInTheDocument();
      });
    });
  });

  // ── Email format validation ──────────────────────────────────────────────────

  describe('Email format validation', () => {
    it('accepts a well-formed email address', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<StudentProfileSettingsForm onSubmit={onSubmit} />);
      await fillForm(user, { email: 'student@university.edu' });
      await submitForm(user);
      await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    });

    it('rejects an email with no @ symbol', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const el = screen.getByLabelText(/email address/i);
      await user.type(el, 'notanemail');
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
      });
    });

    it('rejects an email missing a domain', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const el = screen.getByLabelText(/email address/i);
      await user.type(el, 'user@');
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
      });
    });

    it('rejects an email missing a local part', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const el = screen.getByLabelText(/email address/i);
      await user.type(el, '@domain.com');
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
      });
    });
  });

  // ── Semester range validation ────────────────────────────────────────────────

  describe('Semester range validation', () => {
    it('accepts semester 1 as the lower boundary', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<StudentProfileSettingsForm onSubmit={onSubmit} />);
      await fillForm(user, { semester: '1' });
      await submitForm(user);
      await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    });

    it('accepts semester 8 as the upper boundary', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<StudentProfileSettingsForm onSubmit={onSubmit} />);
      await fillForm(user, { semester: '8' });
      await submitForm(user);
      await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    });

    it('rejects semester 0 (below lower boundary)', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const el = screen.getByLabelText(/current semester/i);
      await user.type(el, '0');
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/semester must be between 1 and 8/i)).toBeInTheDocument();
      });
    });

    it('rejects semester 9 (above upper boundary)', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const el = screen.getByLabelText(/current semester/i);
      await user.type(el, '9');
      await user.tab();
      await waitFor(() => {
        expect(screen.getByText(/semester must be between 1 and 8/i)).toBeInTheDocument();
      });
    });
  });

  // ── Accessibility requirements ───────────────────────────────────────────────

  describe('Accessibility', () => {
    it('renders every input with an associated label', () => {
      render(<StudentProfileSettingsForm />);
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/cgpa/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/annual family income/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/degree program/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/current semester/i)).toBeInTheDocument();
    });

    it('gives each error role="alert"', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      await submitForm(user);
      await waitFor(() => {
        const alerts = screen.getAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
      });
    });

    it('links inputs to their errors via aria-describedby', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'bad');
      await user.tab();
      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
      });
      const errorEl = document.getElementById('email-error');
      expect(errorEl).toBeInTheDocument();
    });
  });

  // ── Successful submit ────────────────────────────────────────────────────────

  describe('Successful submit', () => {
    it('calls onSubmit with the correct typed data when all fields are valid', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<StudentProfileSettingsForm onSubmit={onSubmit} />);

      await fillForm(user, {
        fullName: 'Muhammad Ali',
        email: 'ali@fast.edu.pk',
        cgpa: '3.8',
        familyIncome: '480000',
        degreeProgram: 'MS',
        semester: '4',
      });
      await submitForm(user);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledOnce();
      });

      const [submitted] = onSubmit.mock.calls[0];
      expect(submitted).toMatchObject({
        fullName: 'Muhammad Ali',
        email: 'ali@fast.edu.pk',
        cgpa: 3.8,
        familyIncome: 480000,
        degreeProgram: 'MS',
        semester: 4,
      });
    });

    it('does NOT call onSubmit when the form has validation errors', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<StudentProfileSettingsForm onSubmit={onSubmit} />);
      // Submit with empty form
      await submitForm(user);
      await waitFor(() => {
        expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
      });
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('shows a success banner after a valid submit', async () => {
      const user = userEvent.setup();
      render(<StudentProfileSettingsForm />);
      await fillForm(user);
      await submitForm(user);
      await waitFor(() => {
        expect(
          screen.getByText(/profile saved/i),
        ).toBeInTheDocument();
      });
    });

    it('coerces CGPA and Semester to numbers in the submitted data', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<StudentProfileSettingsForm onSubmit={onSubmit} />);
      await fillForm(user, { cgpa: '2.75', semester: '6' });
      await submitForm(user);
      await waitFor(() => expect(onSubmit).toHaveBeenCalled());
      const [data] = onSubmit.mock.calls[0];
      expect(typeof data.cgpa).toBe('number');
      expect(typeof data.semester).toBe('number');
      expect(data.cgpa).toBe(2.75);
      expect(data.semester).toBe(6);
    });
  });

});
