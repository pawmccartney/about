const fs = require('fs');
const path = require('path');
const faker = require('faker');
const description = require('../../database/descriptionGenerator.js');

let count = 10000000;

const hotelsFile = fs.createWriteStream(path.join('.', 'server', 'db-cassandra', 'seedData', 'hotels.csv'));
(async() => {
  let header = `id|description|number_of_reviews|rank|overall_rating|location_rating|cleanliness_rating|`;
  header += `service_rating|value_rating|hotel_class|hotel_style|hotel_website|languages\n`;
  hotelsFile.write(header);

  for (let i = 1; i <= count; i++) {
    let row = '';
    row += i + '|';
    row += description() + '|';
    row += faker.random.number({ min: 1, max: 20000 }) + '|';
    row += faker.random.number({ min: 1, max: 100 }) + '|';
    for (var j = 0; j < 5; j++) {
      row += (faker.random.number({ min: 1.0, max: 5.0, precision: 0.1 })).toPrecision(2) + '|';
    }
    row += faker.random.number({ min: 1, max: 5 }) + '|';
    row += faker.commerce.productAdjective() + ', ' + faker.commerce.productAdjective() + '|';
    row += faker.internet.url() + '|';

    let languages = ['Spanish', 'French', 'German', 'Portuguese', 'Korean', 'Chinese', 'Italian'];
    row += 'English';
    for (var j = 0; j < faker.random.number({min: 1, max: 7}); j++) {
      let idx = faker.random.number({min: 0, max: languages.length - 1});
      row += ', ' + languages[idx];
      languages.splice(idx, 1);
    }
    row += '\n';

    if (!hotelsFile.write(row)) {
      await new Promise(resolve => hotelsFile.once('drain', resolve));
    }
  }
})();

const featureFile = fs.createWriteStream(path.join('.', 'server', 'db-cassandra', 'seedData', 'hotelFeatures.csv'));
(async() => {
  let header = `id|air_conditioning|room_service|flatscreen_tv|safe|wake_up_service|housekeeping|iron|`;
  header += `balcony|private_beach|additional_bathroom|interconnected_rooms_available|kitchenette|`;
  header += `laptop_safe|vip_room_facilities|refrigerator|private_balcony|sofa|dvd_cd_player|microwave\n`;
  featureFile.write(header);

  for (let i = 1; i <= count; i++) {
    let row = `${i}`;
    for (var j = 0; j < 19; j++) {
      row += `|${faker.random.boolean()}`;
    }
    row += '\n';

    if (!featureFile.write(row)) {
      await new Promise(resolve => featureFile.once('drain', resolve));
    }
  }
})();

const amenFile = fs.createWriteStream(path.join('.', 'server', 'db-cassandra', 'seedData', 'hotelAmenities.csv'));
(async() => {
  let header = `id|valet_parking|pool|free_breakfast|beach|babysitting|free_internet|fitness_center|`;
  header += `entertainment|business_center|spa|diving|wifi|hot_tub|kids_club|fishing|airport_transportation|`;
  header += `banquet_room|couples_massage|taxi_service|steam_room|salon|gift_shop|atm_on_site|dry_cleaning|`;
  header += `front_desk|karaoke|aerobics|swim_up_bar|snack_bar|meeting_rooms|tennis_courts|free_parking|`;
  header += `breakfast_buffet|shuttle_bus_service|security|concierge|currency_exchange|non_smoking_hotel|`;
  header += `sun_loungers_beach_chairs|door_person|shops\n`;
  amenFile.write(header);

  for (let i = 1; i <= count; i++) {
    let row = `${i}`;
    for (var j = 0; j < 41; j++) {
      row += `|${faker.random.boolean()}`;
    }
    row += '\n';

    if (!amenFile.write(row)) {
      await new Promise(resolve => amenFile.once('drain', resolve));
    }
  }
})();

const roomFile = fs.createWriteStream(path.join('.', 'server', 'db-cassandra', 'seedData', 'hotelRoomTypes.csv'));
(async() => {
  let header = `id|ocean_view|suites|family_rooms|non_smoking_rooms\n`;
  roomFile.write(header);

  for (let i = 1; i <= count; i++) {
    let row = `${i}`;
    for (var j = 0; j < 4; j++) {
      row += `|${faker.random.boolean()}`;
    }
    row += '\n';

    if (!roomFile.write(row)) {
      await new Promise(resolve => roomFile.once('drain', resolve));
    }
  }
})();

const imagesFile = fs.createWriteStream(path.join('.', 'server', 'db-cassandra', 'seedData', 'hotelImages.csv'));
(async() => {
  let header = `id|image_id|image_url\n`;
  imagesFile.write(header);

  for (let i = 1; i <= count; i++) {
    for (var j = 0; j < 8; j++) {
      let url = `https://tripadcoba-about.s3.us-east-2.amazonaws.com/image${faker.random.number({min: 1, max: 100})}.jpg`;
      if (!imagesFile.write(`${i}|${j}|${url}\n`)) {
        await new Promise(resolve => imagesFile.once('drain', resolve));
      }
    }
  }
})();
