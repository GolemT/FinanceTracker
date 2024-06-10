import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { FormControl, TextField, IconButton } from '@mui/material';
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';
import {fetchDataAndUpdateContext, useDataContext} from 'app/getContext';
import { useTheme } from 'app/ThemeContext';

const addTags = ({ user }) => {
    const {themeMode} = useTheme();
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState("");
    const {transactions, setTransactions, tags, setTags } = useDataContext();
    const availableTags = tags.map(tag => tag.name.toLowerCase());
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const formattedName = name.toLowerCase();

        if (!name) {
          setMessage("No name was entered")
          return;
        } else if (availableTags.includes(formattedName)) {
          setMessage("Tag exists already")
          return;
        }

        try{
          const response = await fetch('/api/v1/tags/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user.nickname,
              name: name,
              desc: description
          }),
          });
          const result = await response.json();
          if (response.ok) {
            await fetchDataAndUpdateContext(user, setTransactions, setTags)
            router.push('/access/tags');
        } else {
            throw new Error(result.message || 'Failed to add Tag');
        }
    } catch (error) {
        console.error('Error adding tag:', error);
        setMessage(error.message || 'Failed to add tag');
      }
  };
    
    return (
        <Layout>
          <div id="content" className={styles.content} style={{background: themeMode.body, color: themeMode.text}}>
            <h3>Add a new Tag</h3>
            <h4 className={styles.warning}>{message}</h4>
            <FormControl sx={{ m: 1, width: 300}}>

              <TextField 
              label="Name" 
              variant="filled" 
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ 
                input: {color: themeMode.text}, 
                backgroundColor: themeMode.background, 
                '& .MuiInputBase-input': { color: themeMode.text },
                '& .MuiFilledInput-root': { backgroundColor: themeMode.background },
                '& .MuiInputLabel-root': { color: themeMode.label }, 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: themeMode.toggleBorder }}}
              />

              <TextField 
              label="Description"
              variant="filled"
              margin="normal" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ 
                input: {color: themeMode.text}, 
                backgroundColor: themeMode.background,
                '& .MuiInputBase-input': { color: themeMode.text },
                '& .MuiFilledInput-root': { backgroundColor: themeMode.background },
                '& .MuiInputLabel-root': { color: themeMode.label }, 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: themeMode.toggleBorder }}}
              />

              <IconButton aria-label="add" size="large" color="primary" onClick={handleSubmit}>
                  <img src="/Add_button.svg" alt={"add"}/>
              </IconButton>
            </FormControl>
          </div>
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default addTags;