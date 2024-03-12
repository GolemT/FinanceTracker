import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';


export default function addTags () {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState(undefined);
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Hier könntest du die Daten an den Hauptprozess von Electron senden oder in den Zustand deiner Anwendung speichern
        const success = await window.electron.saveTag({ key: name, description });
    if (success) {
        router.push('/tags'); // Navigiere zur Tag-Seite
    } else {
      setMessage('Tag exists already')
    }
  };
    
    return (
        <Layout>
        Add a new Tag
        
            <form onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='Name of the Tag'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            <button type='submit'>Add</button>
            {message}
            </form>
        </Layout>
    )
}