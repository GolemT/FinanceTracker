import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { FormControl, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';

const addTags = ({ user }) => {
    const [name, setName] = useState(undefined);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState(undefined);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
          console.log("No Name given")
          setMessage("No name was entered")
          return;
        }
        // Hier könntest du die Daten an den Hauptprozess von Electron senden oder in den Zustand deiner Anwendung speichern
        const success = await window.electron.saveTag({ key: name, description });
    if (success) {
        router.push('/tags'); // Navigiere zur Tag-Seite
    } else if (success === "No Input"){
        setMessage("No name was entered")
    }
    else {
      setMessage('Tag exists already')
    }
  };
    
    return (
        <Layout>
          <content className={styles.content}>
            <h3>Add a new Tag</h3>
            <h4 className={styles.warning}>{message}</h4>
            <FormControl sx={{ m: 1, width: 300 }}>

              <TextField 
              id="outlined-basic" 
              label="Name" 
              variant="outlined" 
              margin="normal" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              />

              <TextField 
              id="outlined-basic" 
              label="Description"
              variant="outlined" 
              margin="normal" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />

              <IconButton aria-label="add" size="large" color="primary" onClick={handleSubmit}><img src="/Add_button.svg"/></IconButton>
            </FormControl>
          </content>
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default addTags;