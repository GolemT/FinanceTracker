const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const uri = process.env.MONGODB_URI;
export const baseUrl = process.env.AUTH0_BASE_URL;

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});

export default client
