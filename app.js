const express = require('express');
const dotenv = require('dotenv-defaults');
const allRoute = require('./src/routes/index');
const db = require('./src/mongo');
const cors = require('cors');
dotenv.config();

db.on("error", (err) => console.log(err));
    db.once("open", async () => {
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
    });
