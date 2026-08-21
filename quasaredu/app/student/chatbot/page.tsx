"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

const STARTER = "👋 Hi! I'm the QuasarEdu Assistant, powered by Gemini. I can help you find scholarships, explain eligibility rules, or guide your application — even in Urdu! How can I help you today?";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: STARTER },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);

    // TODO: replace with real Gemini API call via /api/chat
    await new Promise((r) => setTimeout(r, 900));
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: "This is a placeholder response. Connect the Gemini API in /api/chat to enable real AI replies.",
      },
    ]);
    setLoading(false);
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="page-header shrink-0">
        <div>
          <h1>QuasarEdu Assistant 🤖</h1>
          <p className="mt-1 text-slate-500">Gemini-powered · Scholarship topics only · Supports Urdu</p>
        </div>
      </div>

      {/* Chat window */}
      <div className="card flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className="shrink-0 text-xl">{m.role === "user" ? "🧑" : "🤖"}</div>
            <div
              className={`max-w-[80%] rounded-card px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-brand-500 text-white"
                  : "bg-surface-muted text-slate-800 border border-surface-border"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="text-xl">🤖</div>
            <div className="rounded-card bg-surface-muted px-4 py-2.5 text-sm text-slate-400 border border-surface-border animate-pulse">
              Thinking…
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="shrink-0 flex gap-2">
        <input
          className="input flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about scholarships… (اردو میں بھی پوچھیں)"
        />
        <button onClick={send} disabled={loading} className="btn-primary px-5">
          Send
        </button>
      </div>
    </div>
  );
}
