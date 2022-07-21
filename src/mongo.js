const mongoose = require('mongoose');
const dotenv = require('dotenv-defaults');
dotenv.config();

mongoose
.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((res) => console.log("mongo db connection created"));

const db = mongoose.connection;
module.exports = db;