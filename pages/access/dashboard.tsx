import Layout from '../../components/Layout';
import StockChart from '../../components/charts/StockChart';
import PieChart from '../../components/charts/PieChart';
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';
import { useEffect, useState, useContext } from 'react';
import { CircularProgress } from '@mui/material';
 
const dashboard = ({ user }) => {
  
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
