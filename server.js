const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db")

// load enviornment variables
dotenv.config({ path: './config/config.env'});

// Connect to db
connectDB();

const app = express();

// Body parser middleware, send data to our API
app.use(express.json());
// enable cors
app.use(cors());

// Set static folder (public)
app.use(express.static(path.join(__dirname, 'public')));

// Routes 
app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
    console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
