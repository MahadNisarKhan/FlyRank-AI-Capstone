export default async function HealthCheckPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold text-green-600">Health Check ✅</h1>
      <p className="mt-2 text-gray-500">Server is running and fetching data successfully.</p>
      <div className="mt-6 bg-gray-100 rounded-xl p-6 w-full max-w-md">
        <p className="text-sm font-semibold text-gray-600 mb-2">Fetched Data:</p>
        <pre className="text-sm text-gray-800 whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </main>
  );
}
