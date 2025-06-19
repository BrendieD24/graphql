import React, { useState, useEffect } from "react";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <Profile token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
