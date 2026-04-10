import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchEntries = async () => {
    try {
      const response = await api.get("/api/vault");
      setEntries(response.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to load entries");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSave = async (item) => {
    try {
      if (item.id) {
        await api.put(`/api/vault/${item.id}`, item);
      } else {
        await api.post("/api/vault", item);
      }
      setSelected(null);
      fetchEntries();
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to save entry");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/vault/${id}`);
      fetchEntries();
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to delete entry");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar onLogout={handleLogout} />
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-lg">
          <h1 className="text-3xl font-semibold">Password Vault</h1>
          <p className="mt-2 text-slate-600">
            Create, update, and manage your encrypted login credentials.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
            {message}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <PasswordForm
            item={selected}
            onSave={handleSave}
            onCancel={() => setSelected(null)}
          />
          <PasswordList
            entries={entries}
            onEdit={setSelected}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}
