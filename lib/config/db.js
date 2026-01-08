/* lib/config/db.js */
import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database.
 * This function handles connection pooling to prevent multiple 
 * active connections during Next.js Hot Reloading.
 */
export const ConnectDB = async () => {
    // 1. Safety Check: If already connected, don't connect again.
    if (mongoose.connection.readyState >= 1) {
        console.log("Using existing database connection");
        return;
    }

    // 2. Environment Variable Validation
    // Make sure your .env file has 'MONGODB_URI' (all caps is standard)
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not defined in your environment variables");
    }

    try {
        // 3. Attempt the connection
        await mongoose.connect(uri);
        console.log("tuko ndani ya Database"); // "We are in the Database"
    } catch (error) {
        // 4. Log errors - crucial for Task 4 validation
        console.error("Database connection failed:", error.message);
    }
}