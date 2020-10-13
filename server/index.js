const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const databaseMethods = require('../database/Hotels');

const app = express ();
const port = 4001;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api/hotel/:hotelId', (req, res) => {
  databaseMethods.getHotel(req.params.hotelId, (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(result);
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
