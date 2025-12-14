import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Signup successful!");
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" placeholder="Name"
          value={name} onChange={(e) => setName(e.target.value)}
        /><br />

        <input 
          type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input 
          type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button type="submit">Create Account</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
