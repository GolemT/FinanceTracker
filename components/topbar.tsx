import styles from '../styles/layout.module.css';
import { useRouter } from 'next/router';
import React from 'react'
import {RefreshButton} from "./RefreshButton";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTheme } from '../app/ThemeContext'

export default function TopBar () {
    const {themeMode, toggleTheme} = useTheme()
    const router = useRouter()
    const { user, error, isLoading } = useUser();

    let pathName = router.pathname.split("/")[2];
    
    const pageName = pathName.replace(pathName.charAt(0), pathName.charAt(0).toUpperCase())

    const loadSettings = () => {
        router.push('/access/settings')
    }

    return (
        <header className={styles.header} style={{ backgroundColor: themeMode.header, color: themeMode.text }}>
            <h2>{pageName}</h2>
            <>
                <RefreshButton user={user}/>
                <button onClick={toggleTheme}>Change Theme</button>
                <img src="/settings.svg" onClick={loadSettings}/>
            </>
        </header>
    )
}