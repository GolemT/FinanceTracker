import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { randomID } from '../components/logic' 
import Layout from '../components/Layout';
 
export default function Home() {
  const num = randomID()
  return (
    <Layout>
        This is the list view
    </Layout>
  );
}
