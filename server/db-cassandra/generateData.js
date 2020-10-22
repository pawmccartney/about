const fs = require('fs');
const path = require('path');
const faker = require('faker');
const description = require('../../database/descriptionGenerator.js');

const roomTypes = ['Ocean View', 'Suites', 'Family Rooms', 'Non-smoking Rooms'];
const features = ['Air Conditioning', 'Room Service', 'Flatscreen TV', 'Safe', 'Wake-up Service',
  'Housekeeping', 'Iron', 'Balcony', 'Private Beach', 'Additional Bathroom',
  'Interconnected rooms available', 'Kitchenette', 'Laptop Safe', 'VIP Room Facilities', 'Refrigerator',
  'Private Balcony', 'Sofa', 'DVD/CD Player', 'Microwave'
];
const amenities = ['Valet Parking', 'Pool', 'Free Breakfast', 'Beach', 'Babysitting', 'Free Internet',
  'Fitness Center', 'Entertainment', 'Business Center', 'Spa', 'Diving', 'WiFi', 'Hot Tub', 'Kids Club',
  'Fishing', 'Airport Transportation', 'Banquet Room', 'Couples Massage', 'Taxi Service', 'Steam Room',
  'Salon', 'Gift Shop', 'ATM on site', 'Dry Cleaning', '24-Hour Front Desk', 'Karaoke', 'Aerobics',
  'Swim-up Bar', 'Snack Bar', 'Meeting Rooms', 'Tennis Courts', 'Free Parking', 'Breakfast Buffet',
  'Shuttle Bus Service', '24-Hour Security', 'Concierge', 'Currency Exchange', 'Non-smoking Hotel',
  'Sun Loungers/Beach Chairs', 'Door Person', 'Shops'
];

const hotelsFile = fs.createWriteStream(path.join('.', 'server', 'db-cassandra', 'hotels.csv'));
(async() => {
  let header = `hotel_name|description|number_of_reviews|rank|overall_rating|location_rating|cleanliness_rating|`;
  header += `service_rating|value_rating|hotel_class|hotel_style|hotel_website|languages|room_types|room_features|`;
  header += `property_amenities|images\n`;
  hotelsFile.write(header);

  for (let i = 1; i <= 10000000; i++) {
    let row = '';
    row += 'hotel' + i + '|';
    row += description() + '|';
    row += faker.random.number({ min: 1, max: 20000 }) + '|';
    row += faker.random.number({ min: 1, max: 100 }) + '|';
    for (var j = 0; j < 5; j++) {
      row += faker.random.number({ min: 1.0, max: 5.0, precision: 0.1 }) + '|';
    }
    row += faker.random.number({ min: 1, max: 5 }) + '|';
    row += faker.lorem.word() + ', ' + faker.lorem.word() + '|';
    row += faker.internet.url() + '|';

    let languages = ['Spanish', 'French', 'German', 'Portuguese', 'Korean', 'Chinese', 'Italian'];
    row += 'English';
    for (var j = 0; j < faker.random.number({min: 1, max: 7}); j++) {
      let idx = faker.random.number({min: 0, max: languages.length - 1});
      row += ', ' + languages[idx];
      languages.splice(idx, 1);
    }
    row += '|'

    var typesMap = {};
    for (var j = 0; j < roomTypes.length; j++) {
      typesMap[roomTypes[j]] = faker.random.boolean();
    }
    row += JSON.stringify(typesMap) + '|';

    var featuresMap = {};
    for (var j = 0; j < features.length; j++) {
      featuresMap[features[j]] = faker.random.boolean();
    }
    row += JSON.stringify(featuresMap) + '|';

    var amenitiesMap = {};
    for (var j = 0; j < amenities.length; j++) {
      amenitiesMap[amenities[j]] = faker.random.boolean();
    }
    row += JSON.stringify(amenitiesMap) + '|';

    row += `https://tripadcoba-about.s3.us-east-2.amazonaws.com/image${faker.random.number({min: 1, max: 100})}.jpg`;
    for (var j = 0; j < 7; j++) {
      row += ', ';
      row += `https://tripadcoba-about.s3.us-east-2.amazonaws.com/image${faker.random.number({min: 1, max: 100})}.jpg`;
    }
    row += '}\n';

    if (!hotelsFile.write(row)) {
      await new Promise(resolve => hotelsFile.once('drain', resolve));
    }
  }
})();
