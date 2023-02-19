const express = require("express");
const router = express.Router();

const { getAllBlogPosts, getBlogById, createBlogPost, updateBlogPost, deleteBlogPost } = require('../controllers/blogController')

router.get('/', getAllBlogPosts)
router.get('/:blogId', getBlogById)
router.post('/', createBlogPost)
router.put('/:blogId', updateBlogPost)
router.delete('/:blogId', deleteBlogPost)

module.exports = router