"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import OvalLoader from "@/components/OvalLoader";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
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

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post("/api/auth/login", {
      identifier: formData.identifier,
      password: formData.password,
    });
    const json = response.data;

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

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96 w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col justify-center">
            <input
              type="text"
              name="identifier"
              placeholder="Email or Phone Number"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-5 py-2 border rounded-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-2 border rounded-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <span className="text-sm text-gray-500 ml-2">
            Don't have an account?{" "}
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URI}/auth/signup`}
              className="text-blue-600"
            >
              Sign Up
            </Link>{" "}
            instead
          </span>
          <div className="flex flex-col items-center">

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-700 mt-3"
            >
            {loading ? <OvalLoader /> : "Login"}
          </button>
          <Link className="text-sm text-gray-500 mt-2" href="/forgot-password">Forgot password ?</Link>
            </div>
        </form>

        <div className="text-center my-3 text-gray-500">or</div>
        <button
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
export default LoginPage;
