import { useState } from "react";
import CreateAccount from "./createAcc";
import logo from "./assets/bridge_logo.png"; // <-- add your logo image in src/assets

function Login({ onLogin }) {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (showCreateAccount) {
    return (
      <CreateAccount
        onAccountCreated={(newUsername) => onLogin(newUsername)}
        onCancel={() => setShowCreateAccount(false)}
      />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
      onLogin(username.trim());
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="login-page">
      {/* Logo + Title */}
      <div className="login-header">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">Login</h2>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="login-links">
        <button
          type="button"
          className="login-link"
          onClick={() => setShowCreateAccount(true)}
        >
          Create Account
        </button>
        <button
          type="button"
          className="login-link"
          onClick={() => alert("Redirect to Forgot Password page")}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default Login;
