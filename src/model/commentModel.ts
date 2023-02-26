import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        userId: { type: String, trim: true, require: true },
        blogId: { type: String, require: true, trim: true },
        commentText: { type: String, require: true, trim: true },
    },
    { timestamps: true }
);

const comments = mongoose.model("comments", commentSchema);

export default comments