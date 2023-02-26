import blogModel from '../model/blogModel';
import { Request, Response } from 'express';
import handleError from '../helper/errorHandler';
import { createBlogInterface } from '../interfaces/blogInterface';

export const fetchAllBlog = async (req: Request, res: Response) => {
    try {
        const blogData = await blogModel.find({}).lean();
        return res.status(200).json({
            success: true,
            message: "fetched blogs successfully",
            data: blogData
        })
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const fetchBlogsByUserId = async (req: Request, res: Response) => {
    try {
        const userData = req.currentUser;
        const blogData = await blogModel.find({ userId: userData._id }).lean();
        return res.status(200).json({
            success: true,
            message: "fetched blogs successfully",
            data: blogData
        })
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const createBlog = async (req: Request, res: Response) => {
    try {
        const userData = req.currentUser;
        let blogData: createBlogInterface = req.body;
        blogData.userId = userData._id;
        const saveBlogData = await blogModel.create(blogData)
        return res.status(201).json({
            success: true,
            message: "blog created successfully"
        })
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const userData = req.currentUser;
        const blogId = req.params;
        let blogData: createBlogInterface = req.body;
        const fetchBlogData = await blogModel.findOne({ _id: blogId }).lean();
        if (!fetchBlogData) {
            return handleError(res, { name: "resourceError", message: "please send a valid blog id" }, 404);
        }
        if (fetchBlogData.userId?.toString() !== userData._id.toString()) {
            return handleError(res, { name: "authError", message: "this request is not authorized" }, 401);
        }
        const updateBlogData = await blogModel.findOneAndUpdate({ _id: blogId }, { title: blogData.title, description: blogData.description });
        return res.status(200).json({
            success: true,
            message: "blog updated successfully",
        });
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const userData = req.currentUser;
        const blogId = req.params;
        const fetchBlogData = await blogModel.findOne({ _id: blogId }).lean();
        if (!fetchBlogData) {
            return handleError(res, { name: "resourceError", message: "please send a valid blog id" }, 404);
        }
        if (fetchBlogData.userId?.toString() !== userData._id.toString()) {
            return handleError(res, { name: "authError", message: "this request is not authorized" }, 401);
        }
        await blogModel.findOneAndDelete({ _id: blogId });
        return res.status(200).json({
            success: true,
            message: "blog deleted successfully",
        });
    } catch (err) {
        return handleError(res, err as Error);
    }
}