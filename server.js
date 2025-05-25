const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const webhook = require('./api/webhook');

const app = express();
app.use(bodyParser.json());

app.all('/webhook', webhook);

app.listen(3000, () => {
  console.log('Bot is running at http://localhost:3000/webhook');
});
