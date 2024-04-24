import { Dashboard } from '@mui/icons-material';
import styles from '../styles/layout.module.css'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function topbar () {
    const router = useRouter()
    let pathName = router.pathname.replace("/", "");
    
    const pageName = pathName.replace(pathName.charAt(0), pathName.charAt(0).toUpperCase())

    const loadSettings = () => {
        router.push('/settings')
    }

    return (
        <header className={styles.header}>
            <h2>{pageName}</h2>
            <img src="/settings.svg" onClick={loadSettings}/>
        </header>
    )
}