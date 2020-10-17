DROP KEYSPACE IF EXISTS about;
CREATE KEYSPACE about WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
USE about;

CREATE TABLE hotels (
  hotel_name varchar,
  description varchar,
  number_of_reviews int,
  overall_rating int,
  rank int,
  location_rating int,
  cleanliness_rating int,
  service_rating int,
  value_rating int,
  hotel_class int,
  hotel_style varchar,
  hotel_website varchar,
  languages varchar,
  room_types map<text, boolean>,
  room_features map<text, boolean>,
  property_amenities map<text, boolean>,
  images set<varchar>,
  PRIMARY KEY (hotel_name)
);
