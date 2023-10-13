"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import axios from 'axios';
import OvalLoader from "@/components/OvalLoader";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    number: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (number, password) => {
    const response = await axios.post(`/api/vendor/login`,{ number, password });
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let response = await handleLogin(formData.number, formData.password);
    setSubmitting(false);
    if (response.success) {
      // localStorage.setItem("vendor_token", response.vendor_token);
      Cookies.set("vendor_token", response.vendor_token, { expires: 1000 }); // Expires in 1 day (adjust as needed)
      router.push("/vendor");
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
    const vendor_token = Cookies.get("vendor_token");
    if (vendor_token) {
      router.push("/vendor");
    }
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Vendor Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="number"
              name="number"
              placeholder="Phone Number"
              value={formData.number}
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
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-3 flex justify-center"
          >
            {submitting ? <OvalLoader/> : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
