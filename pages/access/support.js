import Layout from "../../components/Layout";
import styles from '../../styles/main.module.css'
import { checkAuth } from "../../app/checkAuth";

const support = ({ user }) => {
    return (
        <Layout>
            <content className={styles.content}>
                <h1>Coming Soon</h1>
            </content>
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default support;