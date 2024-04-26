const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rmgdsvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //Restaurants  all collection all api section
    const textileCollection = client.db('textile').collection('products');
  //Restaurants Name  all collection all api section



    // PRODUCT get data client site
    app.get('/product', async (req, res) => {
      const query = textileCollection.find();
      const result = await query.toArray();
      res.send(result);
    });

    //fetch all data here
   

    app.post('/review/:id', async (req, res) => {
        const review = req.body;
        const result = await reviewCollection.insertOne(review);
        res.send(result);
      });

 
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send(
    '<h1 style="font-size:30; margin:20% auto; text-align:center;">Textile design</h1>'
  );
});

app.listen(port, () => {
  console.log(`Textile art craft ${port}`);
});
// hello world