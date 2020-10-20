DROP DATABASE IF EXISTS about;
CREATE DATABASE about;
\c about;

CREATE TABLE hotels (
  description text,
  number_of_reviews smallint,
  rank smallint,
  overall_rating real,
  location_rating real,
  cleanliness_rating real,
  service_rating real,
  value_rating real,
  hotel_class smallint,
  hotel_style text,
  hotel_website text,
  id SERIAL PRIMARY KEY
);

CREATE TABLE languages (
  id serial PRIMARY KEY,
  language text
);

CREATE TABLE hotel_languages (
  hotel_id int,
  lang_id smallint
);

CREATE TABLE amenities (
  id serial PRIMARY KEY,
  amenity text
);

CREATE TABLE hotel_amenities (
  hotel_id int,
  amenity_id smallint
);

CREATE TABLE features (
  id serial PRIMARY KEY,
  feature text
);

CREATE TABLE hotel_features (
  hotel_id int,
  feature_id smallint
);

CREATE TABLE room_types (
  id serial PRIMARY KEY,
  room_type text
);

CREATE TABLE hotel_room_types (
  hotel_id int,
  room_type_id smallint
);

CREATE TABLE images (
  hotel_id int,
  image_url text
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
