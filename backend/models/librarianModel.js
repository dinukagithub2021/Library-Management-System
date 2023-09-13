// models/Librarian.js
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const librarianSchema = new mongoose.Schema({
  username: String,
  password: String,
});

librarianSchema.statics.loginLibrarian = async function(username,password){
  if(!username || !password){
      throw Error("Fill the username and the password")
  }
  const librarian = await this.findOne({username})
  if(!librarian){
      throw Error("No librarian has registered under this username!")
  }

  const isMatching = (password == librarian.password)? true: false
  if(!isMatching){
      throw Error("Incorrect Password!")
  }

  return librarian
}

module.exports = mongoose.model('Librarian', librarianSchema);
