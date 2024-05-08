import Layout from "../../components/Layout";
import styles from '../../styles/main.module.css'
import { checkAuth } from "../../app/checkAuth";

const analytics = ({ user }) => {
    return (
        <Layout>
            <div id="content" className={styles.content}>
                <h1>Coming Soon</h1>
            </div>
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default analytics;