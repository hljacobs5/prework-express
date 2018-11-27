const express = require('express');
const app = express();
const name = require('./name.json')

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(express.static('public'))

app.use(urlLogger, timeLogger);

app.get('/', (request, response) => {
  response.send('hello world');
});

app.get('/json', (request, response) => {
	response.status(200).json(name)
});

app.get('/sunsets', (request, response) => {
	response.sendFile('/public/sunsets.html', {root: __dirname});
})

app.use((request, response, next) => {
  response.status(404).sendFile('/public/error-message.html', {root: __dirname});
});

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});
