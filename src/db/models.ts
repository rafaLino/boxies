import mongoose, { Schema } from 'mongoose';

export interface IBoxModel {
    _id: Schema.Types.UUID,
    userId: string,
    name: string,
    color: string,
    contents: [{ label: string, key: string, value: string, expression: string }]
    updatedAt: Date,
    meta: {
        i: string,
        x: number,
        y: number,
        w: number,
        h: number
    }
}

const ContentSchema = new mongoose.Schema({
    label: String,
    key: String,
    value: String,
    expression: String
}, { _id: false })

const MetaSchema = new mongoose.Schema({
    i: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    w: { type: Number, required: true },
    h: { type: Number, required: true },
}, { _id: false })

const BoxSchema = new mongoose.Schema<IBoxModel>({
    _id: { type: Schema.Types.UUID, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, default: '#ffffff', required: true },
    updatedAt: { type: Date, default: Date.now },
    contents: [ContentSchema],
    meta: MetaSchema
})


export interface IUser {
    _id: Schema.Types.ObjectId
    login: string,
    password: string,
}

const UserSchema = new mongoose.Schema<IUser>({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})


export const BoxModel = (mongoose.models?.Box || mongoose.model('Box', BoxSchema));
export const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);
