const Blog = require("../models/Blog.js");

exports.getAllBlogPosts = async (req, res) => {
  const blogs = await Blog.find();

  return res.send(blogs);
};

exports.getBlogById = async (req, res) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findById(blogId);

  res.json(blog);
};

exports.createBlogPost = async (req, res) => {
  const { user, title, blogPost } = req.body;

  if (!user || !title || !blogPost)
    return res.status(400).json({
      message: "You must provide information",
    });

  const newBlogPost = await Blog.create({
    user: user,
    title: title,
    blogPost: blogPost,
  });

  return res
    .setHeader(
      "Location",
      `http://localhost:4000/api/v1/blog/${newBlogPost._id}`
    )
    .status(201)
    .json(newBlogPost);
};

exports.updateBlogPost = async (req, res) => {
  const blogId = req.params.blogId;

  const { user, title, blogPost } = req.body;

  if (!user || !title || !blogPost)
    return res.status(400).json({
      message: "You must provide information to update",
    });

  const blogToUpdate = await Blog.findById(blogId);

  if (!blogToUpdate) return res.sendStatus(404);

  if (title) blogToUpdate.title = title;
  if (blogPost) blogToUpdate.blogPost = blogPost;
  if (user) blogToUpdate.user = user;

  const response = await blogToUpdate.save();
  console.log(response);
};

exports.deleteBlogPost = async (req, res) => {
  const blogId = req.params.blogId;

  const blogToDelete = await Blog.findById(blogId);

  if (!blogToDelete) return res.sendStatus(404);
  
  const response = await blogToDelete.delete()

  console.log(response)

  return res.sendStatus(204)
};
