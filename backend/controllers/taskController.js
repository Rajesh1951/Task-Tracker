const jwt = require('jsonwebtoken')
const Task = require('../models/tasks')

const decoder = async (token) => {
  return await jwt.decode(token)
}
module.exports.getList = async (req, res) => {
  const id = await decoder(req.headers.authorization.split(' ')[1]);
  try {
    const list = await Task.find({ userId: id });
    res.json(list)
  }
  catch (error) {
    res.json(error)
  }
}

module.exports.createTask = async (req, res) => {
  console.log(req.headers)
  const { name, status, priority } = req.body;
  try {
    const id = await decoder(req.headers.authorization.split(' ')[1]);
    const task = new Task({ name, status, priority, userId: id });
    const saved = await task.save();
    console.log(saved)
    res.send("task created")
  }
  catch (error) {
    res.json(error)
  }
}

module.exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    Task.deleteOne({ _id: id })
      .then(data => {
        res.send("Task deleted")
        return ;
      })
      .catch(err => {
        console.log(err)
        res.send("Failed to delete")
      })
  }
  catch (error) {
    res.json(error)
  }
}

module.exports.updateTask = async (req, res) => {
  const { id,name, status, priority } = req.body;
  try {
    Task.findByIdAndUpdate(id,
      {
        name, status, priority,
      })
      .then(updated => {
        if (!updated) {
          console.log('Not Updated')
          return;
        }
        console.log('Task Updated')
      })
      .catch(err => console.log('error in updating', err))
    res.send("Task Updated")
  }
  catch (error) {
    res.json(error)
  }
}
