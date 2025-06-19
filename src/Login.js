import React, { useState } from "react";

function Login({ onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const basicAuth = btoa(`${identifier}:${password}`);
    try {
      const res = await fetch("https://zone01normandie.org/api/auth/signin", {
        method: "POST",
        headers: { Authorization: `Basic ${basicAuth}` },
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const token = await res.text();
      localStorage.setItem("token", token);
      onLogin(token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto mt-10 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Username or Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full" type="submit">
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default Login;
