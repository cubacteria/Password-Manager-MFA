export default function Navbar({ onLogout }) {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Digital Wallet (for credentials)
          </h2>
          <p className="text-sm text-slate-500">
            Email-based MFA and encrypted vault access
          </p>
        </div>
        <button
          onClick={onLogout}
          className="rounded-2xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
