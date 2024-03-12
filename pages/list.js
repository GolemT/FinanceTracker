import Link from 'next/Link';
import Layout from '../components/Layout';
import React, {useEffect, useState} from 'react'
 
export default function Home() {
  const [data, setData] = useState([]);
  

    useEffect(() => {
        const fetchData = async () => {
            const loadedData = await window.electron.loadData();
            setData(loadedData);
        };

        fetchData();
    }, []);
  
  return (
    <Layout>
        This is the list view
        <ul>
          {Object.entries(data).map(([key, {name, date, tags, amount}]) => (
            <li key={key}>{name}: {date}: {tags}: {amount}</li>
          ))}
          </ul>
        <Link href="/add">Add</Link>
    </Layout>
  );
}
