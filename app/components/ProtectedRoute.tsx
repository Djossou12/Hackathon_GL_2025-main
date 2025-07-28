"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || 
                      document.cookie.includes('isLoggedIn=true');
    
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [router]);

  return <>{children}</>;
}