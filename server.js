const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const graphic = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.info(`running on port ${PORT}`);
  });

  graphic();
  
  // Note: Use "http://localhost:3001/api/(route name)" in insomnia requests.
});
