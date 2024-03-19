import Layout from '../components/Layout';
import StockChart from '../components/charts/StockChart';
import PieChart from '../components/charts/PieChart';
import styles from '../styles/main.module.css'
 
export default function Home() {
  return (
    <Layout>
      <content className={styles.content}>
        <cards className={styles.grid}>
          <div className={styles.card}>
            <h5>Overview</h5>
            <StockChart />
          </div>
          <div className={styles.card}>
            <h5>Based on Tags</h5>
            <PieChart />
          </div>
        </cards> 
      </content>
    </Layout>
  );
}
