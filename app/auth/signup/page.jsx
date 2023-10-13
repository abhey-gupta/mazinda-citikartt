"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import OvalLoader from "@/components/OvalLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { signIn, useSession } from "next-auth/react";

const SignupPage = () => {
  const router = useRouter();
  const session = useSession();
  console.log(session);
  const token = Cookies.get("token");

  if (token) {
    router.push("/");
  } else if (session.status === "authenticated" && !token) {
    const handleContinuewithGoogle = async () => {
      const response = await axios.post("/api/auth/continuewithgoogle", {
        name: session.data.user.name,
        email: session.data.user.email,
      });
      const json = response.data;
      console.log(json);
      if (json.success) {
        Cookies.set("token", json.token, { expires: 1000 }); // Expires in 1 day (adjust as needed)
        router.push("/");
      } else {
        toast.warn(json.message, {
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
    handleContinuewithGoogle();
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "", // New field for phone number
  });

  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate phone number
    if (formData.phoneNumber.length !== 10) {
      toast.warn("Phone number must be 10 digits long 😃", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!termsChecked) {
      // Check if terms are agreed before submitting
      alert("Please agree to the terms and conditions.");
      return;
    }
    const response = await axios.post("/api/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
    });
    const json = await response.data;

    if (json.success) {
      Cookies.set("token", json.token, { expires: 1000 }); // Expires in 1 day (adjust as needed)
      router.push("/");
    } else {
      toast.warn(json.message, {
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
    setLoading(false);
  };

  const handleTermsChange = (e) => {
    setTermsChecked(e.target.checked);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96 w-80 ">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-center">Create an account</h2>
          <div className="text-gray-500">
            <Link href="/auth/login">or login</Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-full w-full px-5 py-2 border focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-full w-full px-5 py-2 border focus:outline-none focus:border-blue-500"
              required
            />
            {/* <span className="text-[0.8rem] text-gray-500">We will share your order details on this email</span> */}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="rounded-full w-full px-5 py-2 border focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-full w-full px-5 py-2 border focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {/* Terms and Conditions Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-5">
              <input
                type="checkbox"
                name="terms"
                checked={termsChecked}
                onChange={handleTermsChange}
                className="rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-gray-700 text-[0.8rem]">
                I agree to the{" "}
                <Link
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/terms-and-conditions" // Replace with your actual terms and conditions link
                >
                  Terms and Conditions{" "}
                </Link>
                and{" "}
                <Link
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/privacy-policy" // Replace with your actual terms and conditions link
                >
                  Privacy Policy{" "}
                </Link>
              </span>
            </label>
          </div>
          {/* Sign Up Button */}
          <button
            type="submit"
            className={`w-full bg-black text-white py-2 rounded-full hover:opacity-70 mt-3 ${
              !termsChecked ? "disabled:opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!termsChecked}
          >
            {loading ? <OvalLoader /> : "Create account"}
          </button>
        </form>
        <div className="text-center my-3 text-gray-500">or</div>
        <button
          disabled
          className="mt-2 w-full justify-center px-4 py-2 border flex gap-2 border-slate-200 rounded-full text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          onClick={() => signIn("google")}
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Continue with Google</span>
        </button>
        <span className="text-gray-700 text-[0.8rem] flex flex-col items-center mt-5">
          By signing in, I agree to the{" "}
          <Link
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
            href="/terms-and-conditions" // Replace with your actual terms and conditions link
          >
            Terms and Conditions{" "}
          </Link>
          and{" "}
          <Link
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
            href="/privacy-policy" // Replace with your actual terms and conditions link
          >
            Privacy Policy{" "}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
