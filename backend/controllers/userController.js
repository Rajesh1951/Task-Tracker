const User = require('../models/userAuth')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const createToken = (id) => {
  console.log(id)
  return jwt.sign(id, process.env.JWT)
}
const handleError = (err) => {
  if (err?.code === 11000) {
    return { "error": "email already registered" }
  }
  else if (err?.errors?.email) {
    return { "error": "email is invalid" }
  }
}
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    const result = await user.save();
    res.json(createToken(String(result._id)))
  }
  catch (err) {
    const error = handleError(err)
    res.json(error)
  }
}

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.json({ "error": "user not found" });
          return;
        }
        user.comparePassword(password)
          .then(result => {
            if (result) {
              res.json(createToken(String(user._id)))
            }
            else {
              res.send('wrong password')
            }
          })
      })
      .catch(err => {
        res.json({ "error": err });
      })
  }
  catch (err) {
    const error = handleError(err)
    res.json(error)
  }
}