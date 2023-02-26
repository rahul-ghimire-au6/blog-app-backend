import Router from "express";
import { createBlog } from '../controller/blogController';
import { verifyToken } from '../helper/authToken';

const blogRoute = Router();

blogRoute.post('/createBlog', verifyToken, createBlog);


export default blogRoute