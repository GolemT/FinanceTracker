import Layout from "../../components/Layout";
import styles from '../../styles/main.module.css'
import { checkAuth } from "../../app/checkAuth";

const analytics = ({ user }) => {
    return (
        <Layout>
            <content className={styles.content}>
                This is the Analytics Page
            </content>
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default analytics;