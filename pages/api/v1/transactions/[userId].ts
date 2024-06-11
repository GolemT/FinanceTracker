import client from '../../../../app/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      await client.connect();
      const database = client.db("FinanceTracker");
      const transactions = database.collection("transactions");
      
      const results = await transactions.find({ user: { $eq: userId } }).toArray();
      
      res.status(200).json(results);
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
