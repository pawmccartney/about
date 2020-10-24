import http from 'k6/http';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 2000,
      maxVUs: 10000,
    }
  }
};

export default function () {
  var url = 'http://localhost:4001/api/hotel/';

  var payload = JSON.stringify({
    "description": "Test",
    "number_of_reviews": 19280,
    "rank": 13,
    "overall_rating": 3.8,
    "location_rating": 4.8,
    "cleanliness_rating": 1.2,
    "service_rating": 5,
    "value_rating": 4.5,
    "hotel_class": 2,
    "hotel_style": "quia, cum",
    "hotel_website": "https://raheem.name",
    "languages_spoken": "Spanish, English, French, Chinese",
    "images": [
        "https://tripadcoba-about.s3.us-east-2.amazonaws.com/image9.jpg",
        "https://tripadcoba-about.s3.us-east-2.amazonaws.com/image82.jpg",
        "https://tripadcoba-about.s3.us-east-2.amazonaws.com/image81.jpg",
        "https://tripadcoba-about.s3.us-east-2.amazonaws.com/image56.jpg",
        "https://tripadcoba-about.s3.us-east-2.amazonaws.com/image23.jpg",
        "https://tripadcoba-about.s3.us-east-2.amazonaws.com/image65.jpg",
        "https://tripadcoba-about.s3.us-east-2.amazonaws.com/image45.jpg",
        "https://tripadcoba-about.s3.us-east-2.amazonaws.com/image8.jpg"
    ],
    "property_amenities": {
        "Valet Parking": false,
        "Pool": true,
        "Free Breakfast": false,
        "Beach": true,
        "Babysitting": true,
        "Free Internet": true,
        "Fitness Center": false,
        "Entertainment": true,
        "Business Center": true,
        "Spa": false,
        "Diving": true,
        "WiFi": false,
        "Hot Tub": true,
        "Kids Club": true,
        "Fishing": true,
        "Airport Transportation": true,
        "Banquet Room": false,
        "Couples Massage": false,
        "Taxi Service": false,
        "Steam Room": true,
        "Salon": true,
        "Gift Shop": true,
        "ATM on site": false,
        "Dry Cleaning": false,
        "24-Hour Front Desk": false,
        "Karaoke": false,
        "Aerobics": true,
        "Swim-up Bar": true,
        "Snack Bar": true,
        "Meeting Rooms": false,
        "Tennis Courts": false,
        "Free Parking": false,
        "Breakfast Buffet": true,
        "Shuttle Bus Service": false,
        "24-Hour Security": true,
        "Concierge": true,
        "Currency Exchange": false,
        "Non-smoking Hotel": false,
        "Sun Loungers/Beach Chairs": false,
        "Door Person": true,
        "Shops": false
    },
    "room_features": {
        "Air Conditioning": false,
        "Room Service": true,
        "Flatscreen TV": false,
        "Safe": true,
        "Wake-up Service": true,
        "Housekeeping": false,
        "Iron": false,
        "Balcony": false,
        "Private Beach": false,
        "Additional Bathroom": true,
        "Interconnected rooms available": true,
        "Kitchenette": true,
        "Laptop Safe": false,
        "VIP Room Facilities": false,
        "Refrigerator": true,
        "Private Balcony": false,
        "Sofa": false,
        "DVD/CD Player": false,
        "Microwave": false
    },
    "room_types": {
        "Ocean View": true,
        "Suites": false,
        "Family Rooms": true,
        "Non-smoking Rooms": false
    }
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}

export function teardown() {
  http.del('http://localhost:4001/api/stress');
}
