const express = require('express');
const app = express();
const port = 4000;
// const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));
// Use CORS for cross-origin requests
// app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// Configure express to use body-parser as middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@datarep2023.hlllrsc.mongodb.net/?retryWrites=true&w=majority');
}

// Define the MongoDB schema for trading cards
const tradingcardSchema = new mongoose.Schema({
  cardname: String,
  cardart: String,
  cardpower: String,
  cardtoughness: String,
  artist: String,
});

// Create a MongoDB model based on the schema
const tradingcardModel = mongoose.model('tradingcards', tradingcardSchema);

// Declares pathways for CRUD operations on trading cards database
app.delete('/api/tradingcard/:id', async (req, res) => {
  // delete request
  try {
    let tradingcard = await tradingcardModel.findByIdAndDelete(req.params.id);
    if (tradingcard) {
      res.status(200).send(tradingcard);
    } else {
      res.status(404).send('TradingCard not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/tradingcard/:id', async (req, res) => {
  // update request
  try {
    let tradingcard = await tradingcardModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (tradingcard) {
      res.status(200).send(tradingcard);
    } else {
      res.status(404).send('TradingCard not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/tradingcard', (req, res) => {
  // create request
  tradingcardModel
    .create({
      cardname: req.body.cardname,
      cardart: req.body.cardart,
      cardpower: req.body.cardpower,
      cardtoughness: req.body.cardtoughness,
      artist: req.body.artist,
    })
    .then(() => {
      res.status(201).send('TradingCard Created');
    })
    .catch(() => {
      res.status(500).send('TradingCard NOT Created');
    });
});

app.get('/api/tradingcards', async (req, res) => {
  // read all trading cards
  try {
    let tradingcards = await tradingcardModel.find({});
    res.status(200).json(tradingcards);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/tradingcard/:identifier', async (req, res) => {
  //  read a specific trading card
  try {
    let tradingcard = await tradingcardModel.findById(req.params.identifier);
    if (tradingcard) {
      res.status(200).send(tradingcard);
    } else {
      res.status(404).send('TradingCard not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
  });


// Express application to listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
