// Dateipfad: pages/api/transactions/add.js

import client from '../../../../../app/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { user, name, date, tags, amount } = req.body;
      await client.connect();
      const database = client.db("FinanceTracker");
      const transactions = database.collection("transactions");

      const result = await transactions.insertOne({ user, name, date, tags, amount });
      
      res.status(201).json({ message: 'Transaction added successfully', result });
    } catch (error) {
      console.error("Error adding transaction:", error);
      res.status(500).json({ message: 'Failed to add transaction' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
