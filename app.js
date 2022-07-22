const express = require('express');
const dotenv = require('dotenv-defaults');
const allRoute = require('./src/routes/index');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init middleware
app.use(cors())

// define routes
app.use('/api', allRoute)

const port = process.env.PORT || 4000
app.listen(port, () =>
  console.log(`listening on port ${port}!`),
);
