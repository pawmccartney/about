const db = require('./index.js');

const amenityList = [
  ('Valet Parking'),
  ('Pool'),
  ('Free Breakfast'),
  ('Beach'),
  ('Babysitting'),
  ('Free Internet'),
  ('Fitness Center'),
  ('Entertainment'),
  ('Business Center'),
  ('Spa'),
  ('Diving'),
  ('WiFi'),
  ('Hot Tub'),
  ('Kids Club'),
  ('Fishing'),
  ('Airport Transportation'),
  ('Banquet Room'),
  ('Couples Massage'),
  ('Taxi Service'),
  ('Steam Room'),
  ('Salon'),
  ('Gift Shop'),
  ('ATM on site'),
  ('Dry Cleaning'),
  ('24-Hour Front Desk'),
  ('Karaoke'),
  ('Aerobics'),
  ('Swim-up Bar'),
  ('Snack Bar'),
  ('Meeting Rooms'),
  ('Tennis Courts'),
  ('Free Parking'),
  ('Breakfast Buffet'),
  ('Shuttle Bus Service'),
  ('24-Hour Security'),
  ('Concierge'),
  ('Currency Exchange'),
  ('Non-smoking Hotel'),
  ('Sun Loungers/Beach Chairs'),
  ('Door Person'),
  ('Shops')
];
const featureList = [
  ('Air Conditioning'),
  ('Room Service'),
  ('Flatscreen TV'),
  ('Safe'),
  ('Wake-up Service'),
  ('Housekeeping'),
  ('Iron'),
  ('Balcony'),
  ('Private Beach'),
  ('Additional Bathroom'),
  ('Interconnected rooms available'),
  ('Kitchenette'),
  ('Laptop Safe'),
  ('VIP Room Facilities'),
  ('Refrigerator'),
  ('Private Balcony'),
  ('Sofa'),
  ('DVD/CD Player'),
  ('Microwave')
];
const roomTypeList = [
  ('Ocean View'),
  ('Suites'),
  ('Family Rooms'),
  ('Non-smoking Rooms')
];

const getHotel = (id) => {
  let queries = [
    db.query(`SELECT * FROM hotels WHERE id=${id}`),
    db.query(`SELECT language FROM languages \
      JOIN hotel_languages ON languages.id = hotel_languages.lang_id \
      JOIN hotels ON hotel_languages.hotel_id = hotels.id \
      WHERE hotels.id=${id};`),
    db.query(`SELECT amenity FROM amenities \
      JOIN hotel_amenities ON amenities.id = hotel_amenities.amenity_id \
      JOIN hotels ON hotel_amenities.hotel_id = hotels.id \
      WHERE hotels.id=${id}`),
    db.query(`SELECT feature FROM features \
      JOIN hotel_features ON features.id = hotel_features.feature_id \
      JOIN hotels ON hotel_features.hotel_id = hotels.id \
      WHERE hotels.id=${id}`),
    db.query(`SELECT room_type FROM room_types \
      JOIN hotel_room_types ON room_types.id = hotel_room_types.room_type_id \
      JOIN hotels ON hotel_room_types.hotel_id = hotels.id \
      WHERE hotels.id=${id}`),
    db.query(`SELECT image_url FROM images \
      JOIN hotels ON images.hotel_id = hotels.id \
      WHERE hotels.id=${id}`)
  ];

  return Promise.all(queries)
  .then((results) => {
    return results.map((result) => result.rows)
  })
  .then((results) => {
    // Note: this formatting is due to the client expecting data shaped like the MongoDB schema
    var hotel = results[0][0];
    hotel.languages_spoken = results[1].map((obj) => obj.language).join(', ');
    hotel.images = results[5].map((obj) => obj.image_url);

    hotel.property_amenities = {};
    for (let amenity of amenityList) {
      hotel.property_amenities[amenity] = results[2].map((obj) => obj.amenity).includes(amenity);
    }

    hotel.room_features = {};
    for (let feature of featureList) {
      hotel.room_features[feature] = results[3].map((obj) => obj.feature).includes(feature);
    }

    hotel.room_types = {};
    for (let type of roomTypeList) {
      hotel.room_types[type] = results[4].map((obj) => obj.room_type).includes(type);
    }

    return hotel;
  })
  .catch((err) => {
    console.error(err);
  })
};

const addHotel = (hotel) => {
  let languages = hotel.languages_spoken.split(', ');
  let amenities = hotel.property_amenities;
  let features = hotel.room_features;
  let types = hotel.room_types;
  let images = hotel.images;

  return db.query(`INSERT INTO hotels(description,number_of_reviews,rank,overall_rating,\
    location_rating,cleanliness_rating,service_rating,value_rating,hotel_class,\
    hotel_style,hotel_website)
      VALUES ('${hotel.description}',${hotel.number_of_reviews}, ${hotel.rank},\
        ${hotel.overall_rating}, ${hotel.location_rating}, ${hotel.cleanliness_rating},\
        ${hotel.service_rating}, ${hotel.value_rating}, ${hotel.hotel_class}, '${hotel.hotel_style}',\
        '${hotel.hotel_website}')
      RETURNING id`)
  .then((results) => {
    let id = results.rows[0].id;
    let queries = [];

    for (let language of languages) {
      queries.push(
        db.query(`SELECT id FROM languages WHERE language='${language}'`)
        .then((results) => {
          db.query(`INSERT INTO hotel_languages(hotel_id,lang_id)
            VALUES(${id}, ${results.rows[0].id})`);
        })
      );
    }

    for (let amenity in amenities) {
      if (amenities[amenity]) {
        queries.push(
          db.query(`SELECT id FROM amenities WHERE amenity='${amenity}'`)
          .then((results) => {
            db.query(`INSERT INTO hotel_amenities(hotel_id,amenity_id)
              VALUES(${id}, ${results.rows[0].id})`);
          })
        );
      }
    }

    for (let feature in features) {
      if (features[feature]) {
        queries.push(
          db.query(`SELECT id FROM features WHERE feature='${feature}'`)
          .then((results) => {
            db.query(`INSERT INTO hotel_features(hotel_id, feature_id)
              VALUES(${id}, ${results.rows[0].id})`);
          })
        );
      }
    }

    for (let type in types) {
      if (types[type]) {
        queries.push(
          db.query(`SELECT id FROM room_types WHERE room_type='${type}'`)
          .then((results) => {
            db.query(`INSERT INTO hotel_room_types(hotel_id,room_type_id)
              VALUES(${id}, ${results.rows[0].id})`);
          })
        );
      }
    }

    for (let image of images) {
      queries.push(
        db.query(`INSERT INTO images(hotel_id,image_url)
          VALUES(${id}, '${image}') RETURNING hotel_id`)
      );
    }

    return Promise.all(queries).catch((err) => {
      console.error(err);
    });
  })
};

const deleteHotel = (id) => {
  let queries = [];

  queries.push(`DELETE FROM hotel_languages WHERE hotel_id=${id}`);
  queries.push(`DELETE FROM hotel_amenities WHERE hotel_id=${id}`);
  queries.push(`DELETE FROM hotel_features WHERE hotel_id=${id}`);
  queries.push(`DELETE FROM hotel_room_types WHERE hotel_id=${id}`);
  queries.push(`DELETE FROM images WHERE hotel_id=${id}`);
  queries.push(`DELETE FROM hotels WHERE id=${id}`);

  return Promise.all(queries.map(query => db.query(query))).catch((err) => {
    console.error(err);
  })
}

const stressTestCleanUp = () => {
  let queries = [];

  queries.push(`DELETE FROM hotel_languages WHERE hotel_id>10000000`);
  queries.push(`DELETE FROM hotel_amenities WHERE hotel_id>10000000`);
  queries.push(`DELETE FROM hotel_features WHERE hotel_id>10000000`);
  queries.push(`DELETE FROM hotel_room_types WHERE hotel_id>10000000`);
  queries.push(`DELETE FROM images WHERE hotel_id>10000000`);
  queries.push(`DELETE FROM hotels WHERE id>10000000`);

  return Promise.all(queries.map(query => db.query(query))).catch((err) => {
    console.error(err);
  })
}

module.exports = {
  getHotel,
  addHotel,
  deleteHotel,
  stressTestCleanUp
}
