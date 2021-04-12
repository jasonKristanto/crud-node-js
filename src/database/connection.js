require('dotenv').config();

const mongoose = require('mongoose');

module.exports = {
  connectDB: async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

      console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  },
}
