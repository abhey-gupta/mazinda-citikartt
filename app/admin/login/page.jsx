"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import OvalLoader from "@/components/OvalLoader";
import axios from 'axios'

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (phone, password) => {
    const response = await axios.post("/api/admin/login", { phone, password });
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let response = await handleLogin(formData.phone, formData.password);
    setSubmitting(false);
    if (response.success) {
      sessionStorage.setItem("token", response.token);
      router.push("/admin");
    } else {
      toast.error(response.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96 w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 mt-3 flex justify-center"
          >
            {submitting ? <OvalLoader/>: (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
