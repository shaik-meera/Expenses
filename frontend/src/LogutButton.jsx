import React from "react";
import { clearTokens } from "./authLocal";

export default function LogoutButton({ onLogout }) {
  const handleClick = () => {
    clearTokens();          // remove tokens from localStorage
    if (onLogout) onLogout(); // optional: parent can navigate to login
  };

  return (
    <button className="exit-btn" onClick={handleClick}>
      Logout
    </button>
  );
}
