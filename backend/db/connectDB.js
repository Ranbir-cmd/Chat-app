import mongoose from 'mongoose';

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Database connection successfully established`);
    } catch (error) {
        console.log(`Error connecting to db: ${error.message}`);
    }
}

export default connectToDB