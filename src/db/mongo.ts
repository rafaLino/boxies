import mongoose, { Mongoose } from "mongoose";
declare global {
    // eslint-disable-next-line no-var
    var mongoose: { conn: Mongoose | null, promise: Promise<Mongoose> | null };
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    const MONGODB_URI = process.env.MONGODB_URI!;

    if (!MONGODB_URI) {
        throw new Error(
            'Missing environment variable: "MONGODB_URI"',
        );
    }

    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts);
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;