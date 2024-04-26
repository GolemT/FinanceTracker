'use client';
import { useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

export default function Home() {

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/access/dashboard');
    }
  }, [user, router]);
  
  return (
      <content>
        <h1 className={styles.title}>The Place to watch over your Finances</h1>
        <a href="/api/auth/login">Lets get started</a> today!
      </content>
  );
};