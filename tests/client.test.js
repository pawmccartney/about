const http = require('http');
const server = require('../server/index.js');
const dbHelp = require('../database/Hotels.js');
const axios = require('axios');

afterAll(() => {
  server.close();
})

describe('GET API endpoint', () => {

  test('should produce hotel info for specified hotel', (done) => {
    http.get('http://localhost:4001/api/hotel/hotel2', (res) => {
      var data = "";
      res.on('data', (d) => {
        data+= d;
      })
      res.on('end', () => {
        data = JSON.parse(data);
        expect(data.hotel_name).toBe('hotel2');
        expect(res.statusCode).toBe(200);
        done();
      })
    })
    .end()
  });
});

describe('POST API endpoint', () => {
  var body = {
    hotel_class: 3,
    description: 'test'
  };

  var hotelIds = [];

  test('should create new database entry', () => {
    return axios.post('http://localhost:4001/api/hotel', body)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.data.hotel_name).toBeDefined();
        hotelIds.push(res.data.hotel_name);
      });
  })

  test('should use properties in request body for hotel info', () => {
    return axios.post('http://localhost:4001/api/hotel', body)
      .then((res) => {
        expect(res.data.hotel_class).toBe(3);
        expect(res.data.description).toBe('test');
        hotelIds.push(res.data.hotel_name);
      });
  })

  test('should have a unique hotel_name', () => {
    dbHelp.Hotels.countDocuments({ hotel_name: hotelIds[0] }, (err, count) => {
      expect(count).toBe(1);
    })
  })
});

describe('PUT API endpoint', () => {
  var update = {
    hotel_class: 4
  };

  test('should respond with the newly updated hotel info', () => {
    return axios.put('http://localhost:4001/api/hotel/hotel100')
      .then((res) => {
        expect(res.data.hotel_name).toBeDefined();
      })
  })

  test('should update the hotel entry with the specified id', () => {
    return axios.put('http://localhost:4001/api/hotel/hotel100', update)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.hotel_name).toBe('hotel100');
      })
  })

  test('should update the hotel with the provided info', () => {
    return axios.put('http://localhost:4001/api/hotel/hotel100', update)
      .then((res) => {
        expect(res.data.hotel_class).toBe(4);
      })
  })
});

describe('DELETE API endpoint', () => {

  test('should delete database entry with matching hotel id', () => {
    return axios.delete('http://localhost:4001/api/hotel/hotel100')
      .then((res) => {
        dbHelp.Hotels.exists({ hotel_name: 'hotel100' }, (err, exists) => {
          expect(exists).toBe(false);
        })
      })
  })

});
