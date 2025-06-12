import mongoose, { Schema } from 'mongoose';

const BoxSchema = new mongoose.Schema({
    _id: { type: Schema.Types.UUID, required: true },
    name: { type: String, required: true },
    color: { type: String, default: '#ffffff', required: true },
    contents: { type: Map, of: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    meta: {
        type: {
            i: { type: String, required: true },
            x: { type: Number, required: true },
            y: { type: Number, required: true },
            w: { type: Number, required: true },
            h: { type: Number, required: true },
        },
        required: true,
    }
})

const UserSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})


export const BoxModel = mongoose.models?.Box || mongoose.model('Box', BoxSchema);
export const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);
