const db = require('./index.js');

let tables = [
  'hotels',
  'hotel_languages',
  'hotel_amenities',
  'hotel_features',
  'hotel_room_types',
  'images'
];

let columns = [
  ['description',
  'number_of_reviews',
  'rank',
  'overall_rating',
  'location_rating',
  'cleanliness_rating',
  'service_rating',
  'value_rating',
  'hotel_class',
  'hotel_style',
  'hotel_website'],
  ['hotel_id', 'lang_id'],
  ['hotel_id', 'amenity_id'],
  ['hotel_id', 'feature_id'],
  ['hotel_id', 'room_type_id'],
  ['hotel_id', 'image_url']
];

let filenames = [
  'hotels.csv',
  'hotelLanguages.csv',
  'hotelAmenities.csv',
  'hotelFeatures.csv',
  'hotelRoomTypes.csv',
  'hotelImages.csv'
];

let table, columnList, filename;
let queries = [];

for (var i = 0; i < tables.length; i++) {
  table = tables[i];
  columnList = columns[i].join(', ');
  filename = filenames[i];
  let query = `COPY ${table}(${columnList})
    FROM '${__dirname}/seedData/${filename}'
    DELIMITER '|' CSV HEADER`;

  queries.push(db.query(query));
}

// Add indexes and foreign keys after insertion
queries.push(db.query(`ALTER TABLE images ADD CONSTRAINT hotel_link
  FOREIGN KEY(hotel_id) REFERENCES hotels(id)`)
);

for(var i = 1; i < 5; i++) {
  queries.push(db.query(`ALTER TABLE ${tables[i]} ADD CONSTRAINT hotel_link
    FOREIGN KEY(hotel_id) REFERENCES hotels(id)`)
  );
  queries.push(db.query(`ALTER TABLE ${tables[i]} ADD CONSTRAINT other_link
    FOREIGN KEY(${columns[i][1]}) REFERENCES ${tables[i].slice(6)}(id)`)
  );
}

// Execute all queries
Promise.all(queries)
.then((results) => {
  console.log(results);
  db.end().then(() => console.log('Seeding is done.'))
})
.catch((err) => {
  console.error(err);
})
