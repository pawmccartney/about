const { performance } = require('perf_hooks');
const db = require('../server/db-cassandra/index.js');

afterAll(() => {
  db.shutdown();
})

describe('Cassandra Query Speeds', () => {
  let times = [];

  test('should return general hotel info', async () => {
    await db.execute(`USE about`);

    const t0 = performance.now();
    let first = await db.execute(`SELECT * FROM hotels WHERE id=9999999`);
    const t1 = performance.now();
    times.push((t1 - t0));
    console.log(first.rows);
    expect(t1 - t0).toBeLessThan(50);
  });

  test('should return property amenity info', async () => {
    const t2 = performance.now();
    await db.execute(`SELECT * from property_amenities WHERE id=9999999`);
    const t3 = performance.now();
    times.push((t3 - t2));
    expect(t3 - t2).toBeLessThan(50);
  });

  test('should return room feature info', async () => {
    const t4 = performance.now();
    await db.execute(`SELECT * from room_features WHERE id=9999999`);
    const t5 = performance.now();
    times.push((t5 - t4));
    expect(t5 - t4).toBeLessThan(50);
  });

  test('should return room type info', async () => {
    const t6 = performance.now();
    await db.execute(`SELECT * from room_types WHERE id=9999999`);
    const t7 = performance.now();
    times.push((t7 - t6));
    expect(t7 - t6).toBeLessThan(50);
  });

  test('should return hotel images', async () => {
    const t8 = performance.now();
    await db.execute(`SELECT * from images WHERE id=9999999`);
    const t9 = performance.now();
    times.push((t9 - t8));
    expect(t9 - t8).toBeLessThan(50);

    console.log('Times for each query:');
    console.log(times);
  });
})
