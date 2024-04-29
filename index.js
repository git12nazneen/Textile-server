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
    // Connect the client to the server	
    // await client.connect();
    //Textile  all collection all api section
    // const textileCollection = client.db('textile').collection('products');
    const addCraftCollection = client.db('addCraftDB').collection('craft');
  //Textile Name  all collection all api section

    app.get('/craft', async (req, res) => {
      const query = addCraftCollection.find();
      const result = await query.toArray();
      res.send(result);
    });

    app.get('/craft/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await addCraftCollection.findOne(query);
      res.send(result);
    })

    //addcraft data show in client site
    app.get('/addCraft', async(req, res)=>{
      const cursor =addCraftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/addCraft/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await addCraftCollection.findOne(query);
      res.send(result);
    })

    // set the data in the mongo
    app.post('/addCraft', async(req, res)=>{
      const addedCraft = req.body;
      console.log(addedCraft)
      const result = await addCraftCollection.insertOne(addedCraft);
      res.send(result);
    })

    app.delete('/addCraft/:id',async (req, res)=>{
      const id = req.params.id;
      console.log('delete id plzzz', id);
      const query = { _id: new ObjectId(id)};
      const result = await addCraftCollection.deleteOne(query)
      res.send(result)
    })

    app.put('/addCraft/:id', async(req, res)=>{
      const id = req.params.id;
      const craft = req.body;
      console.log(id ,craft)
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updatedCraft = {
        $set: {
          item_name:craft.item_name,
          subcategory_Name:craft.subcategory_Name,
           short_description:craft.short_description,
           price:craft.price,
            rating:craft.rating,
             processing_time:craft.processing_time,
              customization:craft.customization,
               stockStatus:craft.stockStatus,
                image:craft.image,
        }
      }
      const result = await addCraftCollection.updateOne(filter, updatedCraft, options);
      res.send(result)
    })
 
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