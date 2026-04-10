export default function PasswordList({ entries, onEdit, onDelete }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Saved passwords</h2>
      {entries.length === 0 ? (
        <p className="text-slate-600">
          No saved passwords yet. Add a new login to secure it.
        </p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-3xl border border-slate-200 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{entry.website}</h3>
                  <p className="text-slate-600">{entry.username}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(entry)}
                    className="rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="rounded-2xl bg-rose-500 px-4 py-2 text-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <div>
                  <strong>Password:</strong> {entry.password}
                </div>
                <div>
                  <strong>Saved:</strong>{" "}
                  {new Date(entry.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
