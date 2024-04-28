import Layout from '../../components/Layout';
import StockChart from '../../components/charts/StockChart';
import PieChart from '../../components/charts/PieChart';
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
 
const dashboard = ({ user }) => {

  const [transactions, setTransactions] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [user.nickname]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const transactionsResponse = await fetch(`/api/v1/transactions/${user.nickname}`);
      const tagsResponse = await fetch(`/api/v1/tags/${user.nickname}`);
      if (transactionsResponse.ok && tagsResponse.ok) {
        const transactions = await transactionsResponse.json();
        setTransactions(transactions); 
        const tags = await tagsResponse.json();
        setTags(tags);
  }} catch (error) {
    console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Layout>
      { isLoading ? (
        <CircularProgress />
      ): (
      <content className={styles.content}>
        <cards className={styles.grid}>
          <div className={styles.card}>
            <h3>Overview</h3>
            <StockChart transactions={transactions}/>
          </div>
          <div className={styles.card}>
            <h3>Based on Tags</h3>
            <PieChart transactions={transactions} tags={tags}/>
          </div>
        </cards> 
      </content>
    )}
    </Layout>
  );
}

export const getServerSideProps = checkAuth();

export default dashboard;
