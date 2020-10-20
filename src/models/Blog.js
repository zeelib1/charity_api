const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
   title:String
})

module.exports = mongoose.model('Blog', BlogSchema, "books");