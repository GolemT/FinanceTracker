import Layout from "../components/Layout";
import styles from '../styles/main.module.css'

export default function goals () {
    return (
        <Layout>
            <content className={styles.content}>
                This is the Goal Page
            </content>
        </Layout>
    )
}