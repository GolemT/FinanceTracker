'use client';
import { useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export default function Home() {

  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  
  return (
      <content>
        <h1>The Place to watch over your Finances</h1>
        <a href="/api/auth/login">Register</a> today!        
      </content>
  );
};