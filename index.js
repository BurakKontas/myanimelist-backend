// Connecting to database

require('dotenv').config();
const express = require("express");

const uri = process.env.MONGO_CONNECTION_STRING;
const PORT = process.env.PORT;

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    // const database = client.db('tos-1');
    // database.createCollection("name",options);
    // const movies = database.collection('tos');
    // const movie = await movies.find().toArray(); // await movies.findOne({"_id":{"guid":"633d73712fad4e332130c8a4"}}).toArray()
    // await movies.insertOne({_id:"test",a:3,b:4}, function(err,res) {
    //   if (err) console.log(err);
    //   else {
    //     console.log("1 document inserted");
    //     client.close();
    //   }
    // })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// run().catch(console.dir);


const server = express();
server.use(express.json());

const cors = require("cors");
const data = require('./datas/animelist');

server.get('/', (req, res) => {
  res.send("Hello World!");
});

server.get('/anime', (req, res) => {
  res.status(200).json(data);
});

server.get('/anime/:animeID', (req, res) => {
  const { animeID } = req.params;
  //req.query = direk ? sonraki sorguları veriyor
  //req.params ise /1 gibi parametreleri veriyor
  //req.body ise gönderilen json dosyası post yöntemi olarak kullanabiliyoruz get ve post u ayırabiliyoruz parametreleri body ile gönderebiliriz yani
  const anime = data.find(anime => anime.anime_id === animeID )
  if(anime)
    res.status(200).json(anime);
  else 
    res.status(404).send("404 NOT FOUND")
});

server.post('/anime', (req, res) => {
  var anime = req.body;
  //anime classını oluşturup classı doldurup öyle data.push atacak
  console.log(anime);
  data.push(anime);
  res.status(201).send(anime);
});

// server.get
// server.post
// server.put
// server.delete
// server.options
// server.head
// server.copy
// server.patch
// server.lock
// server.unlock
// server.propfind
// server.purge

server.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
