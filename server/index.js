const express = require('express');
const path = require('path');
const databaseMethods = require('../database/Hotels');

const app = express ();
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api/hotel/:hotelId', (req, res) => {
  databaseMethods.getHotel(req.params.hotelId, (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(result);
    }
  })
});

app.post('/api/hotel', (req, res) => {
  databaseMethods.createHotel(req.body, (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).send(result);
    }
  })
});

app.put('/api/hotel/:hotelId', (req, res) => {
  databaseMethods.updateHotel(req.params.hotelId, req.body, (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(result);
    }
  })
})

app.delete('/api/hotel/:hotelId', (req, res) => {
  databaseMethods.deleteHotel(req.params.hotelId, (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(result);
    }
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
