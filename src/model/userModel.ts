import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, require: true, trim: true },
        email: { type: String, require: true, trim: true, unique: true, index: true },
        password: { type: String, trim: true },
    },
    { timestamps: true }
);

const users = mongoose.model("users", userSchema);

export default users