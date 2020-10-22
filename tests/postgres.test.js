const { performance } = require('perf_hooks');
const db = require('../server/db-postgres/index.js');

afterAll(() => {
  db.end();
})

describe('Postgres Query Speeds', () => {
  let times = [];

  test('should return main hotel info', async () => {
    await db.query(`SELECT id from hotels WHERE hotels.id = 1`);

    const t0 = performance.now();
    let first = await db.query(`SELECT * FROM hotels WHERE hotels.id = 9999998;`);
    const t1 = performance.now();
    times.push((t1 - t0));
    console.log(first.rows);
    expect(first.rows).toBeDefined();
  })

  test('should return hotel\'s languages', async () => {
    const t2 = performance.now();
    let second = await db.query(`SELECT language FROM languages \
      JOIN hotel_languages ON languages.id = hotel_languages.lang_id \
      JOIN hotels ON hotel_languages.hotel_id = hotels.id \
      WHERE hotels.id = 9999999;`
    );
    const t3 = performance.now();
    times.push((t3 - t2));
    expect(second.rows).toBeDefined();
  })

  test('should return hotel\'s property amenities', async () => {
    const t4 = performance.now();
    let third = await db.query(`SELECT amenity FROM amenities \
      JOIN hotel_amenities ON amenities.id = hotel_amenities.amenity_id \
      JOIN hotels ON hotel_amenities.hotel_id = hotels.id \
      WHERE hotels.id = 9999999;`
    );
    const t5 = performance.now();
    times.push((t5 - t4));
    expect(third.rows).toBeDefined();
  })

  test('should return hotel\'s room features', async () => {
    const t6 = performance.now();
    let fourth = await db.query(`SELECT feature FROM features \
      JOIN hotel_features ON features.id = hotel_features.feature_id \
      JOIN hotels ON hotel_features.hotel_id = hotels.id \
      WHERE hotels.id = 9999999;`
    );
    const t7 = performance.now();
    times.push((t7 - t6));
    expect(fourth.rows).toBeDefined();
  })

  test('should return hotel\'s room types', async () => {
    const t8 = performance.now();
    let fifth = await db.query(`SELECT room_type FROM room_types \
      JOIN hotel_room_types ON room_types.id = hotel_room_types.room_type_id \
      JOIN hotels ON hotel_room_types.hotel_id = hotels.id \
      WHERE hotels.id = 9999999;`
    );
    const t9 = performance.now();
    times.push((t9 - t8));
    expect(fifth.rows).toBeDefined();
  })

  test('should return hotel\'s images', async () => {
    const t10 = performance.now();
    let sixth = await db.query(`SELECT image_url FROM images \
      JOIN hotels ON images.hotel_id = hotels.id \
      WHERE hotels.id = 9999999;`
    );
    const t11 = performance.now();
    times.push((t11 - t10));
    expect(sixth.rows).toBeDefined();
  })

  test('should execute all queries in under 50ms altogether', () => {
    expect(times.reduce((acc, val) => acc + val)).toBeLessThan(50);
    console.log('All query times:', times);
  })
});

/*
  Benchmark Tests:
  23.0
  2.2
  3.8
  2.7
  2.7
  1.0 => Total: 35.4 ms
*/
