const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    
    // Create a simple model for testing
    const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
    
    // Try to create a document
    await Test.create({ name: 'test document' });
    console.log('Test document created successfully');
    
    // Try to fetch the document
    const doc = await Test.findOne({ name: 'test document' });
    console.log('Retrieved test document:', doc);
    
    // Clean up: delete the test document
    await Test.deleteOne({ name: 'test document' });
    console.log('Test document deleted');

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
};

connectDB();