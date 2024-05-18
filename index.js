const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//MidleWare-----------------------------
app.use(cors());
app.use(express.json());
//Trendy-Trunk
//lxna7QCq3DmwP8XW
const uri =
  "mongodb+srv://Trendy-Trunk:lxna7QCq3DmwP8XW@cluster0.j7egbu3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri =
//   "mongodb+srv://<username>:<password>@cluster0.j7egbu3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    //Setting Database Name-----------
    const database = client.db("TrendyTrunk");
    const productsCollection = database.collection("Products");

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.post("/products", async (req, res) => {
      console.log(req.body);
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/product/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
