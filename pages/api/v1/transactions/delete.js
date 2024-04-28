// Dateipfad: pages/api/transactions/delete.js

import client from '../../../../app/db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { names, user } = req.body;

      if (!names || !user) {
        return res.status(400).json({ message: 'Missing names or user information' });
      }

      await client.connect();
      const database = client.db("FinanceTracker");
      const transactions = database.collection("transactions");

      const result = await transactions.deleteMany({
        name: { $in: names},
        user: user 
      });
      
      if (result.deletedCount === names.length) {
        res.status(200).json({ message: 'Transaction deleted successfully' });
      } else {
        throw new Error("Some transactions couldnt be deleted")
      }
    } catch (error) {
      console.error("Error accessing database:", error);
      res.status(500).json({ message: 'Error accessing the database' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
