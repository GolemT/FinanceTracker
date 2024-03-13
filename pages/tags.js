import Layout from "../components/Layout";
import Link from 'next/Link';
import React, {useState, useEffect} from "react";
import { DataGrid } from '@mui/x-data-grid';


export default function tags () {
    const [tags, setTags] = useState({});

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
    { field: 'tag', headerName: 'Tag', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
  ];

    return (
        <Layout>
        This is the Tags Page
        <div style={{ height: '80%', width: '66%' }}>
            <DataGrid
                rows={tags}
                columns={columns}
                pageSize={1}
            />
        </div>
        <Link href="/addTags">Add</Link>
    </Layout>
    )
}