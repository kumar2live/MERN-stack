const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./app/routes/places-routes');
const usersRoutes = require('./app/routes/users-routes');

const HttpError = require('./app/models/http-error');

const app = express();

// parse incoming request
app.use(bodyParser.json());

// api
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({
    message: error.message || 'Something went wrong',
  });
});

app.listen(3001);