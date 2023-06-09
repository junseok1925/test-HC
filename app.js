// const https = require('https');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const swaggerFile = require('./swagger-output');

require('dotenv').config();
const port = process.env.HOST_PORT;

const cookieParser = require('cookie-parser');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler.js');
var cors = require('cors');


app.use(
  cors({
    // origin: 'http://43.200.172.74',
    origin: 'http://the-hera-class.com',
    credentials: true,
  })
);


// app.use(express.static('build'));

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Server open on port ${port}`);
});

// https.createServer(app).listen(port, () => {
//   console.log(`Server open on port ${port}`);
// });
