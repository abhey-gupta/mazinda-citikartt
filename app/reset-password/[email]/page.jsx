"use client";

import { useState } from "react";
import axios from "axios";
import OvalLoader from "@/components/OvalLoader";
import { useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';

const ResetPassword = ({ params }) => {
  const searchParams = useSearchParams();
  const [authState, setAuthState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the passwords match
    if (authState.password !== authState.confirmPassword) {
      toast.error("Passwords do not match"); // Display an error toast
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.post("/api/auth/reset-password", {
        encryptedEmail: params.email,
        signature: searchParams.get("signature"),
        password: authState.password
      });
      setMessage(response.data.message)

    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={authState.password}
              placeholder="New Password"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={authState.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setAuthState({ ...authState, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {message && (
            <p
              className={`mb-4 ${
                message.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
          <div className="text-center">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white py-2 rounded-full hover:opacity-70"
            >
              {loading ? <OvalLoader /> : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
