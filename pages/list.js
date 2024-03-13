import Link from 'next/Link';
import Layout from '../components/Layout';
import React, {useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
 
export default function Home() {
  const [data, setData] = useState([]);
  

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
  
  return (
    <Layout>
        This is the list view
        <div style={{ height: '80%', width: '66%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
            />
        </div>
        <Link href="/add">Add</Link>
    </Layout>
  );
}
