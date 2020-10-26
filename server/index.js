const express = require('express');
const path = require('path');
// const databaseMethods = require('../database/Hotels');
const pgHelp = require('./db-postgres/helpers.js');
require('newrelic');

const app = express ();
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api/hotel/:hotelId', (req, res) => {
  pgHelp.getHotel(req.params.hotelId.slice(5))
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    res.sendStatus(400);
  })
});

app.post('/api/hotel', (req, res) => {
  pgHelp.addHotel(req.body)
  .then((results) => {
    res.status(201).send(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

app.delete('/api/hotel/:hotelId', (req, res) => {
  pgHelp.deleteHotel(req.params.hotelId.slice(5))
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
})

app.delete('/api/stress', (req, res) => {
  pgHelp.stressTestCleanUp()
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
})

app.get('/:hotelName', (req, res) => {
  const fileName = 'index.html';
  const options = {
    root: path.join(__dirname, '../dist')
  };
  res.sendFile(fileName, options, (err) => {
    if(err) {
      console.error(err);
      return;
    } else {
      console.log('success')
      return;
    }
  })
})

var server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = server;
