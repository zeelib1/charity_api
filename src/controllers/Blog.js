
const Blog = require('../models/Blog');

const BlogController = {
  getAll: async (req, res) => {
    console.log("hi there");
    const blog = await Blog.find({});
    // res.sendStatus(401);
    res.json(blog);
  }
}

module.exports = BlogController;