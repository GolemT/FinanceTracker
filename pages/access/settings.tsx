import Layout from '../../components/Layout'
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';

const settings = ({ user }) => {
    return (
        <Layout>
            <div id="content" className={styles.content}>
                <h1 className={styles.title}>Account</h1>
                    <div className={styles.card}>
                        <img src={user.picture} alt={user.name} className={styles.pic}/>
                        <h1>{user.name}</h1>
                        <p>Nickname: {user.nickname}</p>
                        <p>Email: {user.email}</p>
                        <p>Email Verified: {user.email_verified ? 'Yes' : 'No'}</p>
                    </div>
                <a href='/api/auth/logout'> Log me out!</a>
            </div>
            
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default settings;