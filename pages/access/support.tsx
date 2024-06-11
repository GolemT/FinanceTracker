import Layout from "../../components/Layout";
import styles from '../../styles/main.module.css'
import { checkAuth } from "../../app/checkAuth";
import { useTheme } from "../../app/ThemeContext";

const Support = ({ user }) => {
    const {themeMode} = useTheme();

    return (
        <Layout>
            <div id="content" className={styles.content} style={{background: themeMode.body, color: themeMode.text}}>
                <h1>Coming Soon</h1>
            </div>
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default Support;