const mongoose = require("mongoose");

module.exports = {
  start: async () => {

    jest.setTimeout(60000); 

    const uri = "mongodb://127.0.0.1:27017/gst_test_db";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return uri;
  },

  stop: async () => {
    await mongoose.connection.dropDatabase(); 
    await mongoose.connection.close();
  }
};
