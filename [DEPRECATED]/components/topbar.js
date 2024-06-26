import styles from '../styles/layout.module.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function topbar () {
    const router = useRouter()
    let pathName = router.pathname.split("/")[2];
    
    const pageName = pathName.replace(pathName.charAt(0), pathName.charAt(0).toUpperCase())

    const loadSettings = () => {
        router.push('/access/settings')
    }

    return (
        <header className={styles.header}>
            <h2>{pageName}</h2>
            <img src="/settings.svg" onClick={loadSettings}/>
        </header>
    )
}