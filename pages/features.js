import Link from 'next/link'
import styles from '../styles/outside.module.css'

export default function Features() {
  //TODO: Bilder für die einzelnen features hinzufügen
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/">
          <img src="/AppName.svg" alt="App Logo" className={styles.logo}/>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/features" className={styles.featuresLink}>Features</Link>
          <Link href="/api/auth/login" className={styles.loginLink}>Login</Link>
        </div>
      </nav>
      <main className={styles.content}>
        <h1 className={styles.title}>Explore our Features</h1>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <h3>One place for everything</h3>
            <p>Collect all of your personal transactions in one place to stay organized.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Insightful Analytics</h3>
            <p>Get a clear visual understanding of your financial health with interactive charts and graphs detailing your income, expenses, and savings.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Budgeting Tools</h3>
            <p>Create customized budgets that help you manage your spending in alignment with your financial goals.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Secure and Private</h3>
            <p>Your data security is our top priority. Enjoy peace of mind with state-of-the-art encryption and privacy controls.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Mobile Access</h3>
            <p>Access your financial overview anytime and anywhere with our mobile-friendly interface.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Alerts and Notifications</h3>
            <p>Stay informed with real-time alerts and notifications about your financial activity and potential saving opportunities.</p>
          </div>
        </div>
        <Link href="/api/auth/login" className={styles.ctaButton}>Get Started now!</Link>
      </main>
    </div>
  );
};
