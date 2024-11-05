import { model, Schema } from "mongoose";

export interface IUser {
    _id?: string,
    email?: string,
    password?: string,
    image?: string
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    image: String
}, { timestamps: true })

const UserModel = model('user', UserSchema)
export default UserModel