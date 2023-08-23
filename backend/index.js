const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require('./routes/appRoutes')
dotenv.config()

// DB CONNECTION
mongoose.connect(process.env.MONGOURI)
  .then(() => {
    console.log('mongoDB connected')
  })
  .catch((err) => console.log('mongo failed\n', err))

const app = express();
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
  res.send('hi express')
})
app.listen(800, () => {
  console.log('listening @ 800')
})