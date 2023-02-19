require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");

const blogRoute  = require('./routes/blogRoute.js')

//create express app
const app = express();

//req body
app.use(express.json())

//middleware
app.use((req, res, next) => {
  console.log(`Processing ${req.method} to ${req.path}`);
  next();
});

//routes
app.use('/api/v1/blog', blogRoute)

const port = process.env.PORT || 4000;

//start server
async function run() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(4000, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();
