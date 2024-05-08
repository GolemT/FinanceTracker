// Dateipfad: pages/api/tags/add.js

import client from '../../../../../app/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { user, name, desc } = req.body;
      await client.connect();
      const database = client.db("FinanceTracker");
      const tags = database.collection("tags");

      const result = await tags.insertOne({ user, name, desc });
      
      res.status(201).json({ message: 'Tag added successfully', result });
    } catch (error) {
      console.error("Error adding tag:", error);
      res.status(500).json({ message: 'Failed to add tag' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
