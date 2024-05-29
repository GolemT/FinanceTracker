import Layout from '../../components/Layout'
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';
import { useRouter } from 'next/router';

const settings = ({ user }) => {
    const router = useRouter();

    const logout = async () => {
        localStorage.removeItem('tags');
        localStorage.removeItem('transactions');
        await router.push('/api/auth/logout');
    }

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
                <button onClick={logout}>Log me out!</button>
            </div>
            
        </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default settings;