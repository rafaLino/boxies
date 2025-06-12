import mongoose, { Mongoose } from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

declare global {
    // eslint-disable-next-line no-var
    var mongoose: Mongoose;
}


async function dbConnect() {
    if (global.mongoose) {
        return global.mongoose;
    }

    global.mongoose = await mongoose.connect(uri);

    return global.mongoose;
}


export default dbConnect;