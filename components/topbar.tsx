import styles from '../styles/layout.module.css';
import { useRouter } from 'next/router';
import React from 'react'
import {RefreshButton} from "./RefreshButton";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTheme } from '../app/ThemeContext'
import SettingsButton from './SettingsButton';
import ThemeButton from './ThemeButton';

export default function TopBar () {
    const {themeMode} = useTheme()
    const router = useRouter()
    const { user} = useUser();

    let pathName = router.pathname.split("/")[2];
    
    const pageName = pathName.replace(pathName.charAt(0), pathName.charAt(0).toUpperCase())

    return (
        <header className={styles.header} style={{ backgroundColor: themeMode.header, color: themeMode.text }}>
            <h2 style={{flex:1}}>{pageName}</h2>
            <>
                <RefreshButton user={user}/>
                <ThemeButton />
                <SettingsButton/>
            </>
        </header>
    )
}