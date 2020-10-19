const fs = require('fs');
const path = require('path');
const faker = require('faker');
const description = require('../../database/descriptionGenerator.js');

const hotelsFile = fs.createWriteStream(path.join('.', 'server', 'db-postgres', 'seedData', 'hotels.csv'));
(async() => {
  let header = `hotel_name|description|number_of_reviews|rank|overall_rating|location_rating|cleanliness_rating|`;
  header += `service_rating|value_rating|hotel_class|hotel_style|hotel_website\n`;
  hotelsFile.write(header);

  for (let i = 1; i <= 10; i++) {
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
    row += faker.internet.url() + '\n';

    if (!hotelsFile.write(row)) {
      await new Promise(resolve => hotelsFile.once('drain', resolve));
    }
  }
})();

const langFile = fs.createWriteStream(path.join('.', 'server', 'db-postgres', 'seedData', 'hotelLanguages.csv'));
(async() => {
  let header = `hotel_id|lang_id\n`;
  langFile.write(header);

  for (let i = 1; i <= 10; i++) {
    for (var j = 1; j <= 8; j++) {
      if (faker.random.boolean() && !langFile.write(`${i}|${j}\n`)) {
        await new Promise(resolve => langFile.once('drain', resolve));
      }
    }
  }
})();

const featureFile = fs.createWriteStream(path.join('.', 'server', 'db-postgres', 'seedData', 'hotelFeatures.csv'));
(async() => {
  let header = `hotel_id|feature_id\n`;
  featureFile.write(header);

  for (let i = 1; i <= 10; i++) {
    for (var j = 1; j <= 19; j++) {
      if (faker.random.boolean() && !featureFile.write(`${i}|${j}\n`)) {
        await new Promise(resolve => featureFile.once('drain', resolve));
      }
    }
  }
})();

const amenFile = fs.createWriteStream(path.join('.', 'server', 'db-postgres', 'seedData', 'hotelAmenities.csv'));
(async() => {
  let header = `hotel_id|amenity_id\n`;
  amenFile.write(header);

  for (let i = 1; i <= 10; i++) {
    for (var j = 1; j <= 41; j++) {
      if (faker.random.boolean() && !amenFile.write(`${i}|${j}\n`)) {
        await new Promise(resolve => amenFile.once('drain', resolve));
      }
    }
  }
})();

const roomFile = fs.createWriteStream(path.join('.', 'server', 'db-postgres', 'seedData', 'hotelRoomTypes.csv'));
(async() => {
  let header = `hotel_id|room_type_id\n`;
  roomFile.write(header);

  for (let i = 1; i <= 10; i++) {
    for (var j = 1; j <= 4; j++) {
      if (faker.random.boolean() && !roomFile.write(`${i}|${j}\n`)) {
        await new Promise(resolve => roomFile.once('drain', resolve));
      }
    }
  }
})();

const imagesFile = fs.createWriteStream(path.join('.', 'server', 'db-postgres', 'seedData', 'hotelImages.csv'));
(async() => {
  let header = `hotel_id|image_url\n`;
  imagesFile.write(header);

  for (let i = 1; i <= 10; i++) {
    for (var j = 0; j < 8; j++) {
      let url = `https://tripadcoba-about.s3.us-east-2.amazonaws.com/image${faker.random.number({min: 1, max: 100})}.jpg`;
      if (!imagesFile.write(`${i}|${url}\n`)) {
        await new Promise(resolve => imagesFile.once('drain', resolve));
      }
    }
  }
})();
