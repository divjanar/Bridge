// CreateAccount.js
import { useState } from "react";
import "./login.css"; // Reuse the same styling as login

function CreateAccount({ onAccountCreated, onCancel }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !retypePassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== retypePassword) {
      alert("Passwords do not match");
      return;
    }

    // Simulate account creation
    alert(`Account created for ${username}`);
    onAccountCreated(username); // Pass the username back to log in
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Create Account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Retype Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Create Account
        </button>
      </form>

      <div className="login-links">
        <button type="button" className="login-link" onClick={onCancel}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;
