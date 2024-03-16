import Layout from '../components/Layout';
import styles from '../styles/main.module.css'
 
export default function Home() {
  return (
    <Layout>
      <content className={styles.content}>
      This is the dashboard
      </content>
    </Layout>
  );
}
