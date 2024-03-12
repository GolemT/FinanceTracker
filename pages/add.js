import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
 
export default function Add() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    // Formatiere das aktuelle Datum im YYYY-MM-DD Format für das input[type='date']
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [message, setMessage] = useState(undefined);
    const router = useRouter();
    

    useEffect(() => {
      const loadTags = async () => {
          const tagsObj = await window.electron.loadTags();
          const tagsKeys = Object.keys(tagsObj)
          setAvailableTags(tagsKeys);
      };

      loadTags();
  }, []);

    const handleTagChange = (e) => {
      const selectedOptions = [...e.target.options].filter(o => o.selected).map(o => o.value);
    setSelectedTags(selectedOptions);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Hier könntest du die Daten an den Hauptprozess von Electron senden oder in den Zustand deiner Anwendung speichern
        const success = await window.electron.saveData({ name, date, tags: selectedTags, amount });
    // Überprüfe, ob die Speicherung erfolgreich war, bevor du navigierst
    if (success) {
        router.push('/list');
    } else {
        // Handle Fehlerfall
        setMessage('Error while saving');
    }
  };

  

  return (
    <Layout>
        Add a new Transaction
        
        <form onSubmit={handleSubmit}>
          <input 
            type='text'
            placeholder='Name of the Transaction'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select multiple onChange={handleTagChange} value={selectedTags}>
            <option value="">Choose your Tags</option>
            {availableTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <input 
            type='number'
            placeholder='Amount'
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />{message}
          <button type='submit'>Add</button>
        </form>
    </Layout>
  );
}
