const express = require(`express`)
const cors = require('cors')
require(`dotenv`).config();
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i8hxp3j.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){
    try{
        const productsCollection = client.db(`emajhon`).collection(`products`);

        app.get('/products',async(req,res)=>{
            const query = {}
            const cursor = productsCollection.find(query)
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally{

    }
 }
 run().catch(error => console.log(error))
 





app.get('/',(req,res)=> {
    res.send(`emajhon is running`)
})

app.listen(port, () => {
    console.log(`the port is running ${port}`);
})