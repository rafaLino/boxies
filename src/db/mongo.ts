import mongoose, { Mongoose } from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

const globalWithMongo = global as typeof globalThis & {
    _mongoose: Mongoose;
}

async function dbConnect() {
    if (globalWithMongo._mongoose) {
        return globalWithMongo._mongoose;
    }

    globalWithMongo._mongoose = await mongoose.connect(uri);

    return globalWithMongo._mongoose;
}


export default dbConnect;