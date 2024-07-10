
import express from 'express';

import { addBlog, addComment, addLike, addReply, getBlogs, getSingleBlog } from "../controllers/blogController.js";
const router = express.Router();
router.post('/add-blog', addBlog);
router.post('/like', addLike);
router.post('/comment', addComment);
router.post('/reply', addReply);
router.get('/get-blogs', getBlogs);
router.get('/get-blog/:id', getSingleBlog);


export default router;
