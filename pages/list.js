import Layout from '../components/Layout';
import React, {useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/main.module.css'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton';
 
export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter();
  

    useEffect(() => {
        const fetchData = async () => {
            const loadedData = await window.electron.loadData();
            const dataArray = Object.entries(loadedData).map(([id, item]) => ({
              id: id, // Use the key as the id
              name: item.name,
              date: item.date,
              tags: item.tags.join(", "), // Assuming tags is an array, join them for display
              amount: item.amount
          }));
            setData(dataArray);
        };

        fetchData();
    }, []);

    const columns = [
      { field: 'name', headerName: 'Name', width: 300 },
      { field: 'date', headerName: 'Date', width: 300 },
      { field: 'tags', headerName: 'Tags', width: 300 },
      { field: 'amount', headerName: 'Amount', width: 300 },
    ];

    const add = () => {
      router.push('/add')
  }

  
  return (
    <Layout>
        <content className={styles.content}>
          <div style={{ height: '80%', width: '66%' }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
            />
          </div>
          <IconButton aria-label="add" size="large" color="primary" onClick={add} className={styles.icon}><img src="/Add_button.png"/></IconButton>
        </content>
    </Layout>
  );
}
