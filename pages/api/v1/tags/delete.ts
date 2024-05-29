// Dateipfad: pages/api/tags/delete.js

import client from '../../../../app/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { ids, user } = req.body;

      if (!ids || !user) {
        return res.status(400).json({ message: 'Missing names or user information' });
      }

      await client.connect();
      const database = client.db("FinanceTracker");
      const tags = database.collection("tags");

      const objectIds = ids.map(id => new ObjectId(id));

      const result = await tags.deleteMany({ 
        _id: { $in: objectIds},
        user: user 
      });
      
      if (result.deletedCount === ids.length) {
        res.status(200).json({ message: 'Tags deleted successfully' });
      } else {
        throw new Error("Some tags couldnt be deleted")
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
