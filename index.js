const express = require('express');
const bodyParser = require('body-parser');

const mongoConn = require('./src/config/connection');
const logger = require('./src/lib/logger');

const authRoute = require('./src/routes/auth');
const phonebookRoute = require('./src/routes/phonebook');

const app = express();

const port = process.env.PORT || 3001;

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());

// Routes
app.use('/api/v1', authRoute);
app.use('/api/v1', phonebookRoute);

app.use('*', (_req, res, _next) => res.status(404).json({ error: true, message: 'Route not found.' }));

// Global error handler
app.use((error, _req, res, _next) => {

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    error: true,
    statusCode: status,
    message,
    data
  })
});

// Mongoose, app connection
mongoConn.connection()
.then(() => {
 app.listen(port, () => logger.info(`server connected at port: ${port}`));
})
.catch(err => console.log('connection error', err));