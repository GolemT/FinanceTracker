import Link from 'next/Link'
import styles from '../styles/layout.module.css'
import { useRouter } from 'next/router';

export default function sidemenu() {
    const router = useRouter()

     const getLinkStyle = (href) => {
        return router.pathname === href ? { color: '#623CEA', opacity: 1 } : {};
    };

    return (
        <aside className={styles.sidemenu}>
            <span className={styles.title} onClick={() => router.push('/')}>
                <img src="/AppName.svg" />
            </span>
            
            <nav className={styles.nav}>    
            <Link href="/" passHref className={styles.Link}>
                    <span style={getLinkStyle('/')}>Dashboard</span>
                </Link>
                <Link href="/list" passHref className={styles.Link}>
                    <span style={getLinkStyle('/list')}>List</span>
                </Link>
                <Link href="/goals" passHref className={styles.Link}>
                    <span style={getLinkStyle('/goals')}>Goals</span>
                </Link>
                <Link href="/tags" passHref className={styles.Link}>
                    <span style={getLinkStyle('/tags')}>Tags</span>
                </Link>
            </nav>
            <span className={styles.support}>
            <Link href="/support" passHref className={styles.Link}>
                    <span style={getLinkStyle('/support')}>Support</span>
                </Link>
            </span>
        </aside>
    )
}