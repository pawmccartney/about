const db = require('./index.js');

// TODO: Load .txt files into database using COPY
// TODO: Create indexes, add foreign keys

// Testing Connection; remove later
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
