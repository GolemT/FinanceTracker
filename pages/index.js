'use client';
import { useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import Link from 'next/link'
import styles from '../styles/outside.module.css'

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/access/dashboard');
    }
  }, [user, router]);
  
  return (
    <div className={styles.container}>
    <nav className={styles.navbar}>
        <Link href="/">
            <img src="/AppName.svg" alt="App Logo" className={styles.logo}/>
        </Link>
        <div className={styles.navLinks}>
            <Link href="/features" className={styles.featuresLink}>Features</Link>
            <a href="/api/auth/login" className={styles.loginLink}>Login</a>
        </div>
    </nav>
    <div className={styles.background}></div>
    <main className={styles.maincontent}>
        <img src="/logo.svg" className={styles.logo}/>
        <h1 className={styles.title}>The Place to watch over your Finances</h1>
        <p className={styles.subtitle}>Join us and take control of your financial future.</p>
        <a href="/api/auth/login" className={styles.ctaButton}>Let's get started!</a>
    </main>
</div>

  );
};
