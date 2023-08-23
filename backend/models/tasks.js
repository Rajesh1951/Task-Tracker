const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: {
    type: String
  },
  status: {
    type: String
  },
  priority: {
    type: String
  },
  userId: {
    type: String
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;