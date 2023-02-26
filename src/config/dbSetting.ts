import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL ?? "mongodb://localhost:27017/Blog";

const connect = () => {
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions);
        console.log("connected to mongodb successfully");
    } catch (err) {
        console.log((err as Error).message);
    }
};

connect();