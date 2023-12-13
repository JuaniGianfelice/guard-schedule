const express = require("express");
const {MongoClient} = require("mongodb");
const { default: mongoose } = require("mongoose");
const uri = 'mongodb+srv://juanigianfelice:juanigianfelice@schedule-cluster.ffuthzf.mongodb.net/schedule-cluster?retryWrites=true&w=majority'

const app = express();

app.get('/', (req,res) => {
  res.send('Hola')
})

app.post('/singup', (req,res) => {
  res.json('Hola')
})

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const returnedUsers = await users.find().toArray()
    res.send(returnedUsers)
  }

  finally{
    await client.close()
  }
})


const PORT = process.env.PORT ||  8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

