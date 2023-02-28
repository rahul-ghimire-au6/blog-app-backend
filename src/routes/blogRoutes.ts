import Router from "express";
import { createBlog, fetchAllBlog, fetchBlogsByUserId, updateBlog, deleteBlog } from '../controller/blogController';
import { verifyToken } from '../helper/authToken';

const blogRoute = Router();

blogRoute.post('/createBlog', verifyToken, createBlog);
blogRoute.get('/fetchAllBlog', fetchAllBlog);
blogRoute.get('/fetchBlogsByUserId', verifyToken, fetchBlogsByUserId);
blogRoute.put('/updateBlog/:blogId', verifyToken, updateBlog);
blogRoute.delete('/deleteBlog/:blogId', verifyToken, deleteBlog);


export default blogRoute