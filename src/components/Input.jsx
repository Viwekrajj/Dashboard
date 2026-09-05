
import { useState } from 'react';
import { Link } from 'react-router';
import { EyeIcon } from '../icons/EyeIcon';

export default function Input({ label, type = "text", value, onChange, error, placeholder, name }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="input-wrap">
        <input
          className={`input ${isPassword ? "has-icon" : ""} ${error ? "error" : ""}`}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
        />
        {isPassword && (
          <button className="input-icon" type="button" onClick={() => setShow(!show)}>
            <EyeIcon open={show} />
          </button>
        )}
      </div>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}