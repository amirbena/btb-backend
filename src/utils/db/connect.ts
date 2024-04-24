import { connect, connection } from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      // Add other options if needed (e.g., useCreateIndex)
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;