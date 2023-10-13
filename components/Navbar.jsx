"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import LogoMain from "@/public/logoMain.png";

import { BiUserCircle } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

import { signOut, useSession } from "next-auth/react";

import LoadingBar from "react-top-loading-bar";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [token, setToken] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 300);

    let token = Cookies.get("token");
    if (token) {
      setToken(token);
    }
  }, [pathname, searchParams]);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {!(pathname.includes("vendor") || pathname.includes("admin")) && (
        <nav className="border-gray-200 p-5 shadow-md">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <Link href="/" className="flex">
              <Image src={LogoMain} width={100} alt="Citikartt"></Image>
            </Link>
            {token && (
              <>
                <button
                  data-collapse-toggle="mobile-menu"
                  type="button"
                  className="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center ml-auto mr-1"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div
                  className="hidden md:block w-full md:w-auto ml-auto mr-10"
                  id="mobile-menu"
                >
                  <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                    <li>
                      <Link
                        href="/"
                        className="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded focus:outline-none"
                        aria-current="page"
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/myorders"
                        className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                        aria-current="page"
                      >
                        Orders
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                      >
                        Contact
                      </Link>
                    </li>

                    <li>
                      <div className="relative">
                        <button
                          className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto text-xl"
                          onClick={() => {
                            setShowDropdown(!showDropdown); // Toggle the dropdown
                          }}
                        >
                          <BiUserCircle />{" "}
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>

                        {showDropdown && (
                          <div className="absolute right-0 mt-2 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44">
                            <ul>
                              <li>
                                <Link
                                  href="/auth/login"
                                  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 w-full"
                                  onClick={() => {
                                    if (session.status === "authenticated") {
                                      signOut("google");
                                    }
                                    Cookies.remove("token");
                                    setToken("");
                                    setShowDropdown(false);
                                  }}
                                >
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </nav>
      )}
      <button
        id="backBtn"
        type="button"
        className=" mt-2 px-2 py-2 bg-gray-200 text-gray-600 rounded-md ml-2 hover:bg-gray-300 hover:text-gray-700 focus:outline-none"
        onClick={() => window.history.back()}
      >
        <IoIosArrowBack />
      </button>
      <Script src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js" />
    </>
  );
};

export default Navbar;
