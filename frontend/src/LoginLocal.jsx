import { useState } from "react";
import { setTokens } from "./authLocal";
import "./style.css";

const DEMO_USER = "yourname";
const DEMO_PASS = "yourpassword";

export default function LoginLocal({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() !== DEMO_USER || password !== DEMO_PASS) {
      alert("Invalid username/password");
      return;
    }

    // fake tokens
    const access = "access_" + Math.random().toString(36).slice(2);
    const refresh = "refresh_" + Math.random().toString(36).slice(2);
    const accessExp = Date.now() + 5 * 60 * 1000; // 5 minutes

    setTokens(access, refresh, accessExp);
    onSuccess();
  };

  return (
  <div className="login-page">
    <div className="login-box">
      <h2>Expense Tracker</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      
    </div>
  </div>
);
}