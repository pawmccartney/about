const db = require('./index.js');
const fs = require('fs');

// Create 10 million hotels
// fs.writeFile hotels, hotelLanguages, hotelFeatures, hotelRoomTypes, hotelAmenities, imageUrls
// Note: the above section should be commented out after the files are generated

// Load .txt files into database using COPY
// Create indexes, add foreign keys

// Testing Connection
db.query(`SELECT * FROM languages WHERE language='English'`)
  .then((result) => {
    console.log(result.rows);
  })
  .then(() => {
    db.end().then(() => { console.log('seeding has ended')});
  })
  .catch((err) => {
    console.error(err);
  });
