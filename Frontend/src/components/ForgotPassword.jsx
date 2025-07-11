import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1);

  const handleForgotPassword = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleRequestToken = async () => {
    const res = await fetch("http://localhost:8000/api/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setToken(data.reset_token || "");
    setStep(2);
  };

  const handleResetPassword = async () => {
    const newPassword = prompt("Enter your new password:");

    const res = await fetch("http://localhost:8000/api/reset-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, new_password: newPassword }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">🔐 Forgot Password</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <button
            onClick={handleRequestToken}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Get Reset Token
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="mb-2">🧾 Your reset token:</p>
          <div className="p-2 bg-gray-100 rounded mb-2">{token}</div>
          <button
            onClick={handleResetPassword}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Enter New Password
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
