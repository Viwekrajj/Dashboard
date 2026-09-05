import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import Input from '../components/Input';
import { loginRequest } from '../store/slices/authSlice';

export default function LoginPage({ onSwitch }) {
  // const { login } = useSelector((state) =>  state.auth.login);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setApiError(""); 
    // setLoading(true);
    dispatch(loginRequest(form))

    // try {
    //   const data = await apiCall("/auth/login", "POST", form);
    //   // login({ email: form.email, name: data.name || form.email.split("@")[0] }, data.token || data.data?.token || "demo-token");
    // } catch (err) {
    //   setApiError(err.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <div className="auth-card-logo">
          <div className="logo-mark">V</div>
          <span className="logo-name">Vault</span>
        </div>
        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-subheading">
          No account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>
            Create one free
          </a>
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {apiError && <div className="alert alert-error">{apiError}</div>}
        <Input label="Email address" type="email" value={form.email}
          onChange={set("email")} error={errors.email} placeholder="you@example.com" />
        <Input label="Password" type="password" value={form.password}
          onChange={set("password")} error={errors.password} placeholder="Your password" />
        <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : "Sign in"}
        </button>

        <div className="divider">or try demo</div>
        <button type="button" className="btn btn-ghost btn-full btn-sm"
          // onClick={() => login({ email: "demo@vault.app", name: "Demo User" }, "demo-jwt-token-xyz")}
          >
          Continue as demo user
        </button>
      </form>
    </div>
  );
}
