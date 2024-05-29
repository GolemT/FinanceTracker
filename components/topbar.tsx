import styles from '../styles/layout.module.css';
import { useRouter } from 'next/router';
import React from 'react'
import {RefreshButton} from "./RefreshButton";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function topbar () {
    const router = useRouter()
    const { user, error, isLoading } = useUser();

    let pathName = router.pathname.split("/")[2];
    
    const pageName = pathName.replace(pathName.charAt(0), pathName.charAt(0).toUpperCase())

    const loadSettings = () => {
        router.push('/access/settings')
    }

    return (
        <header className={styles.header}>
            <h2>{pageName}</h2>
            <>
                <RefreshButton user={user}/>
                <img src="/settings.svg" onClick={loadSettings}/>
            </>
        </header>
    )
}