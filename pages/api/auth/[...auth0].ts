// /pages/api/auth/[...auth0].ts
import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: '/access/dashboard'
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        afterCallback: async (req, res, session, state) => {
          // Here you can use the session or state to make decisions
          return {
            ...session,
            returnTo: state?.returnTo || '/access/dashboard',
          };
        }
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
