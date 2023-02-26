import { Types } from "mongoose"

export interface createBlogInterface {
    userId: Types.ObjectId,
    title: string,
    description: string
}