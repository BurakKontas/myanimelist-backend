// Connecting to database

require('dotenv').config();
const express = require("express");
const schedule = require('node-schedule');

//classes
const Anime = require("./models/anime")
const User = require('./models/user');
const MongoDB = require("./models/mongo")

var connectionUser = new MongoDB("animeDB","userList",process.env.MONGO_CONNECTION_ANIME);
var connectionAnime = new MongoDB("animeDB","animeList",process.env.MONGO_CONNECTION_ANIME);

const PORT = process.env.PORT;

const server = express();
server.use(express.json());

const cors = require("cors");
const dataAnimes = require('./datas/animelist');
const dataUsers = require('./datas/malusers');


server.get('/', (req, res) => {
  res.send("Hello World!");
});

server.get('/animes', async (req, res) => {
  await connectionAnime.find().then((result) => {
    res.status(200).json(result)
  })
});

// server.get('/users', (req, res) => {
//   res.status(200).json(dataUsers);
// });

server.get('/anime/:animeID', async (req, res) => {
  const { animeID } = req.params;
  //req.query = direk ? sonraki sorguları veriyor
  //req.params ise /1 gibi parametreleri veriyor
  //req.body ise gönderilen json dosyası post yöntemi olarak kullanabiliyoruz get ve post u ayırabiliyoruz parametreleri body ile gönderebiliriz yani
  var anime = await connectionAnime.find({'_id': animeID});
  if(anime.length > 0)
    res.status(200).json(anime);
  else 
    res.status(404).send("404 NOT FOUND")
});

// server.post('/anime', (req, res) => {
//   var anime = new Anime(req.body)
//   //anime classını oluşturup classı doldurup öyle data.push atacak
//   dataAnimes.push(anime);
//   res.status(201).send(anime);
// });

// server.patch("/anime", (req,res) => {
//   connectionAnime.dropCollection("animeList");
//   connectionAnime.createCollection("animeList");
//   var animeList = [];
//   dataAnimes.map((data,i) => {
//     var anime = new Anime(data)
//     animeList.push(anime)
//   });
//   connectionAnime.insertDocuments(animeList);
//   res.send(`${animeList.length} documents inserted`);
// });

// server.patch("/users", (req,res) => {
//   connectionUser.dropCollection("userList");
//   connectionUser.createCollection("userList");
//   var userList = [];
//   dataUsers.map((data,i) => {
//     var user = new User(data)
//     userList.push(user)
//   });
//   connectionUser.insertDocuments(userList);
//   res.send(`${userList.length} documents inserted`);
// });

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

//scheduled jobs

const backup = schedule.scheduleJob("* * 00 * * *", function () {
    console.log("backup'd");
});