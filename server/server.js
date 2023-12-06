require("dotenv").config();

const express = require("express");
const {MongoClient} = require("mongodb")
const uri = 'mongodb+srv://juanigianfelice:gianfelice-schedule-5@schedule-cluster.ffuthzf.mongodb.net/?retryWrites=true&w=majority'

//const mongoose = require("mongoose");
//const bodyParser = require("body-parser");

const app = express();

/*Anterior
app.use(bodyParser.json());
mongoose.connect(

  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("Conected to MongoDB")
);
app.use("/api/calendar", require("./Controllers/calendarController"));
*/

app.post('/AdminDashboard', (req,res) => {
  res.json('Hola')
})

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

