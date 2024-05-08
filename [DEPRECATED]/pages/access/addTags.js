import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { FormControl, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../../app/checkAuth';
import { CircularProgress } from '@mui/material';

const addTags = ({ user }) => {
    const [name, setName] = useState(undefined);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [availableTags, setAvailableTags] = useState([]);
    const router = useRouter();

    useEffect(() => {
      const fetchTags = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/v1/tags/${user.nickname}`);
            const data = await response.json();
            if (response.ok) {
                setAvailableTags(data.map(tag => tag.name.toLowerCase()));
            } else {
                throw new Error('Failed to fetch tags');
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
            setMessage('Failed to load tags');
        } finally {
          setIsLoading(false);
        }
    };

    fetchTags();
}, []);

    const handleSubmit = async (e) => {
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
          { isLoading ? (
            <CircularProgress />
          ) : (
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
          )}
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default addTags;