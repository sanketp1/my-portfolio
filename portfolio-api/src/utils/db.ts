import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/portfolio';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    await mongoose.connect(MONGODB_URI, {
      // Add connection options to handle authentication
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err: any) {
    console.error('❌ MongoDB connection failed');
    
    // Log minimal error information for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', err.message);
    }
    
    // Don't exit the process, let it continue with mock data
    console.log('⚠️  Continuing without database connection. Some features may not work.');
  }
}; 