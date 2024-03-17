import Layout from '../components/Layout';
import React, {useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/main.module.css'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton';
 
export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([]);

    const handleDelete = () => {

    }

    const handleEdit = () => {

    }

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
      { field: 'name', headerName: 'Name', width: 400 },
      { field: 'date', headerName: 'Date', width: 200 },
      { field: 'tags', headerName: 'Tags', width: 300 },
      { 
        field: 'amount',
        headerName: 'Amount',
        width: 150,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => {
          return (
            <span style={{ 
              color: params.value >=0 ? '#20BF55' : '#DB3A34',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>{`${params.value} €`}</span>
          )
        }
      }
    ];

    const add = () => {
      router.push('/add')
  }

  const animationClass = selectedRows.length > 0 ? styles.animateButtons : styles.none;
  
  return (
    <Layout>
        <content className={styles.content}>
          <div style={{ height: '90%', width: '75%' }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              checkboxSelection
              sortModel={[
                {
                  field: 'date',
                  sort: 'desc',
                },
              ]}
              onRowSelectionModelChange={(newSelection) => {
                setSelectedRows(newSelection)
              }}
            />
          </div>
          <div className={styles.buttons}>
          <div className={animationClass}>
            {selectedRows.length > 0 && (
              <>
                <IconButton aria-label="delete" size="medium" color="secondary" onClick={handleDelete}>
                  <img src="/delete.png"/>
                </IconButton>
                <IconButton aria-label="edit" size="medium" color="primary" onClick={handleEdit}>
                  <img src="/edit.png"/>
                </IconButton>
              </>
            )}
          </div>
            <IconButton aria-label="add" size="medium" color="primary" onClick={add} className={styles.icon}>
              <img src="/Add_button.png"/>
              </IconButton>
          </div>
        </content>
    </Layout>
  );
}
