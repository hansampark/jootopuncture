const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./server/routes');
const User = require('./server/models/user');

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DEFAULT_DATABASE,
  PORT,
  HOST
} = process.env;

const MONGODB_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-1cth2.mongodb.net/${MONGO_DEFAULT_DATABASE}`;

const server = express();
const port = PORT || 5000;
const host = HOST || '0.0.0.0';

server.use(helmet());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Resolve CORS error
// server.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   // GraphQL rejects any request but POST, browser sends OPTIONS request initially and fails
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

//  resolve CORS error
server.use(cors());

server.use('/api', routes);

// handling error using built-in express package
server.use((error, req, res, next) => {
  const { statusCode, message, data } = error;
  const status = error.statusCode || 500;

  res.status(status).json({ message, statusCode });
});

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));

  server.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    server.listen(port, () => console.log(`Listening on port ${port}`));
    console.log('[connection has been established successfully]');
  })
  .catch(err => {
    console.log('[Unable to connect to the database]', err);
  });
