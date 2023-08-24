const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require('./routes/appRoutes')
const cors = require('cors')
dotenv.config()

// DB CONNECTION
mongoose.connect(process.env.MONGOURI)
  .then(() => {
    console.log('mongoDB connected')
  })
  .catch((err) => console.log('mongo failed\n', err))

const app = express();
app.use(express.json())
const corsConfig={
  origin:['http://localhost:3000','https://task-tracker-rajesh.netlify.app']
}
app.use(cors(corsConfig))
app.use(router)

app.get('/', (req, res) => {
  res.send('hi express')
})
app.listen(800, () => {
  console.log('listening @ 800')
})