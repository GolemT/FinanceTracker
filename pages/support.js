import Layout from "../components/Layout";
import styles from '../styles/main.module.css'

export default function support () {
    return (
        <Layout>
            <content className={styles.content}>
            This is the support page
            </content>
        </Layout>
    )
}