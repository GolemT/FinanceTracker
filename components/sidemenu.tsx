import Link from 'next/link'
import styles from '../styles/layout.module.css'
import { useRouter } from 'next/router';
import { useTheme } from 'app/ThemeContext';

export default function SideMenu() {
    const {themeMode} = useTheme()
    const router = useRouter()

     const getLinkStyle = (href) => {
        return router.pathname === href ? { color: '#623CEA', opacity: 1 } : { color: themeMode.text };
    };

    return (
        <aside className={styles.sidemenu} style={{ backgroundColor: themeMode.sidebar, color: themeMode.text, borderRight: '1px solid grey'}}>
            <span className={styles.title} onClick={() => router.push('/access/dashboard')}>
                <img src="/logo.svg" />
                <h1>FinanceTracker</h1>
            </span>
            
            <nav className={styles.nav}>    
                <Link href="/access/dashboard" passHref className={styles.Link}>
                    <span style={getLinkStyle('/access/dashboard')}>Dashboard</span>
                </Link>
                <Link href="/access/list" passHref className={styles.Link}>
                    <span style={getLinkStyle('/access/list')}>List</span>
                </Link>
                <Link href="/access/analytics" passHref className={styles.Link}>
                    <span style={getLinkStyle('/access/analytics')}>Analytics</span>
                </Link>
                <Link href="/access/tags" passHref className={styles.Link}>
                    <span style={getLinkStyle('/access/tags')}>Tags</span>
                </Link>
            </nav>
            <span className={styles.support}>
            <Link href="/access/support" passHref className={styles.Link}>
                    <span style={getLinkStyle('/access/support')}>Support</span>
                </Link>
            </span>
        </aside>
    )
}