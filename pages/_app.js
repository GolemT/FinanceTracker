// pages/_app.js
import { UserProvider } from '@auth0/nextjs-auth0/client';
import App from 'next/app';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
