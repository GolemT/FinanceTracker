import Layout from '../../components/Layout';
import StockChart from '../../components/charts/StockChart';
import PieChart from '../../components/charts/PieChart';
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';
 
const dashboard = ({ user }) => {

  return (
    <Layout>
      <content className={styles.content}>
        <cards className={styles.grid}>
          <div className={styles.card}>
            <h3>Overview</h3>
            {/* <StockChart /> */}
          </div>
          <div className={styles.card}>
            <h3>Based on Tags</h3>
            {/* <PieChart /> */}
          </div>
        </cards> 
      </content>
    </Layout>
  );
}

export const getServerSideProps = checkAuth();

export default dashboard;
