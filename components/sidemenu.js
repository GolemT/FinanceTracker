import Link from 'next/Link'

export default function sidemenu() {
    return (
        <aside>
            <h1>FinanceTracker</h1>
                    <Link href="/" >Dashboard</Link>
                    <Link href="/list">List</Link>
                    <Link href="/goals">Goals</Link>
                    <Link href="/tags">Tags</Link>
            <Link href="/support">Support</Link>
        </aside>
    )
}