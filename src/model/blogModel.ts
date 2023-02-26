import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        userId: { type: String, trim: true, require: true },
        blogTitle: { type: String, require: true, trim: true },
        blogDescription: { type: String, require: true, trim: true },
    },
    { timestamps: true }
);

const blogs = mongoose.model("blogs", blogSchema);

export default blogs