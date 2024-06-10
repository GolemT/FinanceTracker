// components/Layout.js
import Head from 'next/head';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import SideMenu from './sidemenu'
import TopBar from './topbar'
import styles from '../styles/layout.module.css'

const Layout = ({ children }) => {

    return (
        <>
            <SpeedInsights />
            <Head>
                <title>FinanceTracker</title>
                <link rel="icon" href="/logo.svg" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <main className={styles.layout}>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />  
                <TopBar />
                <SideMenu />
                {children}
                <Analytics />
            </main>
            {/* <footer>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                Powered by{' '}
                <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
                </a>
            </footer> */}
            <style jsx>{`
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                footer img {
                    margin-left: 0.5rem;
                }
                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }
                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family:
                    Menlo,
                    Monaco,
                    Lucida Console,
                    Liberation Mono,
                    DejaVu Sans Mono,
                    Bitstream Vera Sans Mono,
                    Courier New,
                    monospace;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                padding: 0;
                margin: 0;
                font-family:
                    -apple-system,
                    BlinkMacSystemFont,
                    Segoe UI,
                    Roboto,
                    Oxygen,
                    Ubuntu,
                    Cantarell,
                    Fira Sans,
                    Droid Sans,
                    Helvetica Neue,
                    sans-serif;
                }
                * {
                box-sizing: border-box;
                }
            `}</style>
        </>
    );
};

export default Layout;
