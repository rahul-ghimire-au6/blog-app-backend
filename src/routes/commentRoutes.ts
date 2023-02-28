import Router from "express";
import { fetchAllCommentByBlogId, fetchAllCommentByUserId, addComment, editcomment, deletecomment } from '../controller/commentController';
import { verifyToken } from '../helper/authToken';

const commentRoute = Router();

commentRoute.post('/addComment/:blogId', verifyToken, addComment);
commentRoute.get('/fetchAllCommentByBlogId/:blogId', fetchAllCommentByBlogId);
commentRoute.get('/fetchAllCommentByUserId', verifyToken, fetchAllCommentByUserId);
commentRoute.put('/editcomment/:commentId', verifyToken, editcomment);
commentRoute.delete('/deletecomment/:commentId', verifyToken, deletecomment);


export default commentRoute