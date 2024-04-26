import Layout from '../../components/Layout'
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';

const settings = ({ user }) => {
    return (
        <Layout>
            <content className={styles.content}>
                This is the settings page

                <a href='/api/auth/logout'> Log me out!</a>
            </content>
            
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default settings;