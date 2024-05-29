import { UserProvider } from '@auth0/nextjs-auth0/client';
import {DataContextProvider} from "../app/getContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
        <DataContextProvider>
            <Component {...pageProps} />
        </DataContextProvider>
    </UserProvider>
  );
}

export default MyApp;
