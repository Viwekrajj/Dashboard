import { Link } from 'react-router';

export default function HomePage() {
  const { user, token, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    setLoading(true); setError("");
    try {
      const data = await apiCall("/user/profile", "GET", null, token);
      setProfile(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const initials = (name) => name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="logo-mark">V</div>
          <span className="logo-name">Vault</span>
        </div>
        <div className="navbar-actions">
          <div className="user-chip">
            <div className="user-avatar">{initials(user?.name)}</div>
            {user?.name || user?.email}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={logout}>
            <LogoutIcon /> Sign out
          </button>
        </div>
      </nav>

      <div className="home-hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          Authenticated session active
        </div>
        <h1 className="hero-title">
          Welcome back,<br />
          <span>{user?.name?.split(" ")[0] || "friend"}</span> 👋
        </h1>
        <p className="hero-sub">
          You're signed in with a valid JWT token. Your session is secured
          and all protected routes are accessible.
        </p>

        <div className="hero-card">
          <div className="hero-card-label">Your JWT token</div>
          <div className="token-display">{token}</div>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
          <button className="btn btn-primary" onClick={fetchProfile} disabled={loading}>
            {loading ? <span className="spinner" /> : <><UserIcon /> Fetch profile</>}
          </button>
          <button className="btn btn-ghost" onClick={logout}>
            <LogoutIcon /> Sign out
          </button>
        </div>

        {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>{error}</div>}

        {profile && (
          <div className="hero-card">
            <div className="hero-card-label">Profile data from API</div>
            <div className="token-display">{JSON.stringify(profile, null, 2)}</div>
          </div>
        )}

        <div className="stats-grid">
          {[
            { value: "256-bit", label: "AES encryption" },
            { value: "24h", label: "Token lifespan" },
            { value: "BCrypt", label: "Password hashing" },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

