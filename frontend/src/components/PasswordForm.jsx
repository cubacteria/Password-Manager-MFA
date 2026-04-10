import { useEffect, useState } from "react";

const initialState = {
  id: null,
  website: "",
  username: "",
  password: "",
};

export default function PasswordForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setForm(item || initialState);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">
        {item ? "Edit Password" : "Add New Password"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Website</span>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website or service"
            required
            className="mt-1 w-full rounded-2xl border border-slate-300 p-3"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Username</span>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Account username"
            required
            className="mt-1 w-full rounded-2xl border border-slate-300 p-3"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Account password"
            required
            className="mt-1 w-full rounded-2xl border border-slate-300 p-3"
          />
        </label>
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-white"
          >
            {item ? "Update" : "Add"}
          </button>
          {item && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-2xl border border-slate-300 px-5 py-3 text-slate-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
