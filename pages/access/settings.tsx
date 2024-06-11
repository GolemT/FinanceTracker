import Layout from '../../components/Layout'
import styles from '../../styles/main.module.css'
import { checkAuth } from '../../app/checkAuth';
import { useRouter } from 'next/router';
import { useTheme } from 'app/ThemeContext';

const Settings = ({ user }) => {
    const {themeMode} = useTheme()
    const router = useRouter();

    const logout = async () => {
        localStorage.removeItem('tags');
        localStorage.removeItem('transactions');
        await router.push('/api/auth/logout');
    }

    return (
        <Layout>
            <div id="content" className={styles.content} style={{ backgroundColor: themeMode.body, color: themeMode.text}}>
                <h1 className={styles.title}>Account</h1>
                    <div className={styles.card} style={{ border: themeMode.cardBorder, color: themeMode.text, backgroundColor: themeMode.background }}>
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

export default Settings;