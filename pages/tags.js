import Layout from "../components/Layout";
import Link from 'next/Link';
import React, { useEffect, useState } from "react";

export default function tags () {
    const [tags, setTags] = useState({});

  useEffect(() => {
    const fetchTags = async () => {
      const loadedTags = await window.electron.loadTags(); // Stelle sicher, dass dies in deinem preload.js definiert ist
      setTags(loadedTags);
    };

    fetchTags();
  }, []);

    return (
        <Layout>
                This is the Tags Page
                <ul>
                    {Object.entries(tags).map(([key, description]) => (
                    <li key={key}>{key}: {description}</li>
                    ))}
                </ul>
                <Link href="/addTags">Add</Link>
        </Layout>
    )
}