import mongoose, { Mongoose } from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
    throw new Error(
        'Missing environment variable: "MONGODB_URI"',
    );
}

const globalWithMongoose = global as typeof globalThis & {
    _mongoose?: Mongoose
}

let client: Mongoose;

async function dbConnect() {
    if (process.env.NODE_ENV === 'development') {

        if (!globalWithMongoose._mongoose) {
            globalWithMongoose._mongoose = await mongoose.connect(MONGODB_URI)
        }

        client = globalWithMongoose._mongoose;
    }
    else {
        client = await mongoose.connect(MONGODB_URI)
    }

    return client;
}

export default dbConnect;