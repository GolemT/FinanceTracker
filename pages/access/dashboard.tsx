import Layout from '../../components/Layout';
import StockChart from '../../components/charts/StockChart';
import PieChart from '../../components/charts/PieChart';
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';
import {fetchDataAndUpdateContext, useDataContext} from "../../app/getContext";
import {useEffect} from "react";
 
const dashboard = ({ user }) => {
  const {transactions, setTransactions, tags, setTags } = useDataContext();

  const checkForContext = async () => {
    if (transactions.length === 0 || tags.length === 0){
      await fetchDataAndUpdateContext(user, setTransactions, setTags);
    }
  }

  useEffect(() => { checkForContext()}, []);

  return (
    <Layout>
      <div id="content" className={styles.content}>
        <div id='cards' className={styles.grid}>
          <div className={styles.card}>
            <h3>Overview</h3>
            <StockChart />
          </div>
          <div className={styles.card}>
            <h3>Based on Tags</h3>
            <PieChart/>
          </div>
        </div> 
      </div>
    </Layout>
  );
}

export const getServerSideProps = checkAuth();

export default dashboard;
