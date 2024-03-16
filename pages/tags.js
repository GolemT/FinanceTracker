import Layout from "../components/Layout";
import React, {useState, useEffect} from "react";
import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/main.module.css';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';


export default function tags () {
    const [tags, setTags] = useState({});
    const router = useRouter();

    useEffect(() => {
      const fetchTags = async () => {
          const loadedTags = await window.electron.loadTags(); // Fetches tags
          // Convert the tags object into an array structure suitable for DataGrid
          const tagsArray = Object.entries(loadedTags).map(([key, description], index) => ({
              id: index, // DataGrid requires a unique 'id' field
              tag: key,
              description: description,
          }));
          setTags(tagsArray);
      };

      fetchTags();
  }, []);

  const columns = [
    { field: 'tag', headerName: 'Tag', width: 250 },
    { field: 'description', headerName: 'Description', width: 600 },
  ];

    const addTag = () => {
        router.push('/addTags')
    }

    return (
        <Layout>
            <content className={styles.content}>
                <div style={{ height: '80%', width: '66%' }}>
                    <DataGrid
                        rows={tags}
                        columns={columns}
                        pageSize={1}
                    />
                </div>
                <IconButton aria-label="add" size="large" color="primary" onClick={addTag} className={styles.icon}><img src="/Add_button.png"/></IconButton>
            </content>
    </Layout>
    )
}