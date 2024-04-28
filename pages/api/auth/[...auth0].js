// /pages/api/auth/[...auth0].js
import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: '/access/dashboard' // Setze das hier fest, um sicherzustellen, dass es korrekt übergeben wird
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        redirectTo: '/access/dashboard', // Stelle sicher, dass dies korrekt übergeben wird
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
