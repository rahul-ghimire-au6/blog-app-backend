import commentModel from '../model/commentModel';
import blogModel from '../model/blogModel';
import { Request, Response } from 'express';
import handleError from '../helper/errorHandler';

export const fetchAllCommentByBlogId = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        const commentData = await commentModel.find({ blogId }, { __v: 0,updatedAt:0 }).populate([{ "path": "userId", "model": "users","select":{name:1,email:1} }]).lean();
        return res.status(200).json({ success: true, message: "comments fetched successfully", data: commentData });
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const fetchAllCommentByUserId = async (req: Request, res: Response) => {
    try {
        const userData = req.currentUser;
        const commentData = await commentModel.find({ userId: userData._id }, { _v: 0 }).populate([{ "path": "blogId", "model": "blogs" }]).lean();
        return res.status(200).json({ success: true, message: "comments fetched successfully", data: commentData });
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const addComment = async (req: Request, res: Response) => {
    try {
        const userData = req.currentUser;
        const {blogId} = req.params;
        const {commentData} = req.body;
        //validatating blog id
        const fetchBlogById = await blogModel.findOne({ _id: blogId }).lean();
        if (!fetchBlogById) {
            return handleError(res, { name: "resourseError", message: "please send a valid blog id" }, 404);
        }
        //blog got validated now we can add the comments to the blog
        const commentObj = {
            commentText:commentData,
            userId : userData._id,
            blogId : blogId,
        }
        
        const createComment = await commentModel.create(commentObj);
        //sending success response
        return res.status(200).json({ success: true, message: "comment added successfully" });
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const editcomment = async (req: Request, res: Response) => {
    try {
        const userData = req.currentUser;
        const commentId = req.params.commentId;
        const newComment = req.body.commentText;
        //validatating comment id
        const fetchCommentId = await commentModel.findOne({ _id: commentId }, { __v: 0 }).lean();
        if (!fetchCommentId) {
            return handleError(res, { name: "resourseError", message: "please send a valid comment id" }, 404);
        }
        //comment got validated now need to validate author of comment
        if (fetchCommentId.userId?.toString() !== userData._id.toString()) {
            return handleError(res, { name: "authError", message: "this request is not authorized" }, 401);
        }
        //validation completed now updating comment
        const updateComment = await commentModel.findOneAndUpdate({ _id: commentId }, { commentText: newComment });
        return res.status(200).json({ success: true, message: "comment updated successfully" });
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const deletecomment = async (req: Request, res: Response) => {
    try {
        const userData = req.currentUser;
        const commentId = req.params.commentId;
        //validatating comment id
        const fetchCommentId = await commentModel.findOne({ _id: commentId }, { __v: 0 }).lean();
        if (!fetchCommentId) {
            return handleError(res, { name: "resourseError", message: "please send a valid comment id" }, 404);
        }
        //comment got validated now need to validate author of comment
        if (fetchCommentId.userId?.toString() !== userData._id.toString()) {
            return handleError(res, { name: "authError", message: "this request is not authorized" }, 401);
        }
        //validation completed now updating comment
        const deleteComment = await commentModel.findOneAndDelete({ _id: commentId });
        return res.status(200).json({ success: true, message: "comment deleted successfully" });
    } catch (err) {
        return handleError(res, err as Error);
    }
}
