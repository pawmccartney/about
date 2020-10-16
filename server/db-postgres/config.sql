DROP DATABASE IF EXISTS about;
CREATE DATABASE about;
\c about;

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
  hotel_website varchar
);

CREATE TABLE languages (
  id serial PRIMARY KEY,
  language varchar
);

CREATE TABLE hotel_languages (
  hotel_id int,
  lang_id int
);

CREATE TABLE amenities (
  id serial PRIMARY KEY,
  amenity varchar
);

CREATE TABLE hotel_amenities (
  hotel_id int,
  amenity_id int
);

CREATE TABLE features (
  id serial PRIMARY KEY,
  feature varchar
);

CREATE TABLE hotel_features (
  hotel_id int,
  feature_id int
);

CREATE TABLE room_types (
  id serial PRIMARY KEY,
  room_type varchar
);

CREATE TABLE hotel_room_types (
  hotel_id int,
  room_type_id int
);

CREATE TABLE images (
  hotel_id int,
  image_url varchar
);

INSERT INTO languages(language)
VALUES
  ('Spanish'),
  ('English'),
  ('French'),
  ('German'),
  ('Portuguese'),
  ('Korean'),
  ('Chinese'),
  ('Italian');

INSERT INTO room_types(room_type)
VALUES
  ('Ocean View'),
  ('Suites'),
  ('Family Rooms'),
  ('Non-smoking Rooms');

INSERT INTO features(feature)
VALUES
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
  ('Microwave');

INSERT INTO amenities(amenity)
VALUES
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
  ('Shops');
