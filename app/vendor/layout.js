'use client'

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import NavbarVendor from '@/components/NavbarVendor'
import Cookies from 'js-cookie';

export default function RootLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const vendor_token = Cookies.get("vendor_token");
    if (!vendor_token) {
      router.push('/vendor/auth/login')
    }
  }, [pathname, searchParams])

  return (
    <>
      <NavbarVendor />
      {children}
    </>
  );
}