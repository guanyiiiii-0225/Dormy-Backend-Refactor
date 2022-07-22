const express = require('express');
const dotenv = require('dotenv-defaults');
const allRoute = require('./src/routes/index');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
// const db = require('./src/mongo');
const cors = require('cors');
dotenv.config();

// db.on("error", (err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init middleware
app.use(cors())

// define routes
app.use('/api', allRoute)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = process.env.PORT || 4000
app.listen(port, () =>
  console.log(`listening on port ${port}!`),
);
// db.once("open", async () => {
// });
