'use client'

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [pathname, searchParams])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
    </>
  );
}