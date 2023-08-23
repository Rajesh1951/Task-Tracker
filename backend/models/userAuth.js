const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique:true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
    return next()
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
  catch (error) {
    return next(error);
  }
})

userSchema.methods.comparePassword = async function (candidateP) {
  try {
    return await bcrypt.compare(candidateP, this.password);
  }
  catch (error) {
    throw error;
  }
}
const User = mongoose.model('User', userSchema)
module.exports = User;