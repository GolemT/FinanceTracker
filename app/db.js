const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const uri = process.env.MONGODB;

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});

export default client
