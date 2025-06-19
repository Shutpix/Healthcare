const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const connectDb = async ()=>{
     await mongoose.connect(mongoURI);
}

module.exports = connectDb;




// async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('✅ MongoDB connected');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error.message);
//     process.exit(1);
//   }
// };