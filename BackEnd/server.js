const express = require('express')
const app = express()
const port = 4000

const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));



const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@datarep2023.hlllrsc.mongodb.net/?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const tradingcardSchema = new mongoose.Schema({
  title:String,
  cover:String,
  author:String
})

const tradingcardModel = mongoose.model('dfgdfgdfgdfg5r5645634fggh', tradingcardSchema);

app.delete('/api/tradingcard/:id',async (req, res)=>{
  console.log("Delete: "+req.params.id);

  let tradingcard = await tradingcardModel.findByIdAndDelete(req.params.id);
  res.send(tradingcard);
})


app.put('/api/tradingcard/:id', async(req, res)=>{
  console.log("Update: "+req.params.id);

  let tradingcard = await tradingcardModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(tradingcard);
})


app.post('/api/tradingcard', (req,res)=>{
    console.log(req.body);

    tradingcardModel.create({
      title:req.body.title,
      cover:req.body.cover,
      author:req.body.author
    })
    .then(()=>{ res.send("TradingCard Created")})
    .catch(()=>{ res.send("TradingCard NOT Created")});

})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/tradingcards', async(req, res)=>{
    
  let tradingcards = await tradingcardModel.find({});
  res.json(tradingcards);
})

app.get('/api/tradingcard/:identifier',async (req,res)=>{
  console.log(req.params.identifier);

  let tradingcard = await tradingcardModel.findById(req.params.identifier);
  res.send(tradingcard);
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})