import { UserProvider } from '@auth0/nextjs-auth0/client';
import {DataContextProvider} from "../app/getContext";
import { ThemeProvider } from '../app/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider>
      <DataContextProvider>
            <Component {...pageProps} />
        </DataContextProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
