import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const clearMessages = () => {
    setMessage("");
    setError("");
  };

  const handleRequestToken = async () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    clearMessages();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setToken(data.reset_token || "");
        setStep(2);
        setMessage("Reset token generated successfully!");
      } else {
        setError(data.error || "Failed to generate reset token");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    clearMessages();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage("Password reset successfully! You can now sign in with your new password.");
        setStep(3);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setToken("");
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
    clearMessages();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/20 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Reset Password
            </h2>
            <p className="text-slate-600 dark:text-gray-300">
              {step === 1 && "Enter your email to get a reset token"}
              {step === 2 && "Enter your new password"}
              {step === 3 && "Password reset complete"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
              {message}
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 
                           bg-white/50 dark:bg-gray-700/50 text-slate-700 dark:text-white
                           focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none
                           transition-all duration-200 disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleRequestToken}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-medium text-white
                         bg-gradient-to-r from-cyan-500 to-green-500 
                         hover:from-cyan-600 hover:to-green-600 
                         focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl"
              >
                {loading ? "Generating Token..." : "Get Reset Token"}
              </button>
            </div>
          )}

          {/* Step 2: Password Reset */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-100 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-gray-300 mb-1">Reset Token:</p>
                <code className="text-xs text-slate-800 dark:text-white font-mono break-all">
                  {token}
                </code>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 
                           bg-white/50 dark:bg-gray-700/50 text-slate-700 dark:text-white
                           focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none
                           transition-all duration-200 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 
                           bg-white/50 dark:bg-gray-700/50 text-slate-700 dark:text-white
                           focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none
                           transition-all duration-200 disabled:opacity-50"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-xl font-medium 
                           bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300
                           hover:bg-slate-200 dark:hover:bg-gray-600
                           focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-xl font-medium text-white
                           bg-gradient-to-r from-cyan-500 to-green-500 
                           hover:from-cyan-600 hover:to-green-600 
                           focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                           shadow-lg hover:shadow-xl"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              <button
                onClick={resetForm}
                className="w-full py-3 px-4 rounded-xl font-medium text-white
                         bg-gradient-to-r from-cyan-500 to-green-500 
                         hover:from-cyan-600 hover:to-green-600 
                         focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                         transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl"
              >
                Reset Another Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
