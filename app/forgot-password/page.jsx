"use client";

import { useState } from "react";
import axios from "axios";
import OvalLoader from "@/components/OvalLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      const data = response.data;

      console.log(data);
      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>
        <p className="mb-4 text-gray-600">
          Enter the email address associated with your account and we'll send
          you a link to reset your password
        </p>
        {message && (
          <p
            className={`mb-4 ${
              message.includes("successfully") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="text-center">
            <button
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

export default ForgotPassword;
