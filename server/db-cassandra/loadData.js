const db = require('./index.js');

// TODO: Load .csv files into database using loader

// Testing Connection; remove later
const query = `SELECT * FROM hotels`;
db.execute(query)
  .then(result => {
    console.log(result);
  })
  .then(() => {
    db.shutdown().then(() => { console.log('seeding has ended')});
  })
  .catch((err) => {
    console.error(err);
  });
