import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Input from '../components/Input';



export default function  SignupPage({ onSwitch }) {
  // const { user, token, isAuthenticated } = useSelector((state) => ({ login: state.auth.login}));
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setApiError(""); setLoading(true);
    try {
      await apiCall("/auth/register", "POST", { name: form.name, email: form.email, password: form.password });
      setSuccess(true);
      setTimeout(() => onSwitch(), 2000);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  if (success) {
    return (
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 className="auth-heading">Account created!</h2>
        <p className="auth-subheading" style={{ marginTop: 8 }}>Redirecting you to sign in…</p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <div className="auth-card-logo">
          <div className="logo-mark">V</div>
          <span className="logo-name">Vault</span>
        </div>
        <h1 className="auth-heading">Create account</h1>
        <p className="auth-subheading">
          Already have one?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Sign in</a>
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {apiError && <div className="alert alert-error">{apiError}</div>}
        <Input label="Full name" value={form.name} onChange={set("name")}
          error={errors.name} placeholder="Rahul Kumar" />
        <Input label="Email address" type="email" value={form.email}
          onChange={set("email")} error={errors.email} placeholder="you@example.com" />
        <Input label="Password" type="password" value={form.password}
          onChange={set("password")} error={errors.password} placeholder="Min. 6 characters" />
        <Input label="Confirm password" type="password" value={form.confirm}
          onChange={set("confirm")} error={errors.confirm} placeholder="Repeat password" />
        <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : "Create account"}
        </button>
      </form>
    </div>
  );
}

