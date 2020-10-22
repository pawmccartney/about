DROP KEYSPACE IF EXISTS about;
CREATE KEYSPACE about WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
USE about;

CREATE TABLE hotels (
  id int,
  description varchar,
  number_of_reviews smallint,
  rank smallint,
  overall_rating float,
  location_rating float,
  cleanliness_rating float,
  service_rating float,
  value_rating float,
  hotel_class smallint,
  hotel_style varchar,
  hotel_website varchar,
  languages varchar,
  PRIMARY KEY (id)
);

CREATE TABLE property_amenities (
  id int,
  valet_parking boolean,
  pool boolean,
  free_breakfast boolean,
  beach boolean,
  babysitting boolean,
  free_internet boolean,
  fitness_center boolean,
  entertainment boolean,
  business_center boolean,
  spa boolean,
  diving boolean,
  wifi boolean,
  hot_tub boolean,
  kids_club boolean,
  fishing boolean,
  airport_transportation boolean,
  banquet_room boolean,
  couples_massage boolean,
  taxi_service boolean,
  steam_room boolean,
  salon boolean,
  gift_shop boolean,
  atm_on_site boolean,
  dry_cleaning boolean,
  front_desk boolean,
  karaoke boolean,
  aerobics boolean,
  swim_up_bar boolean,
  snack_bar boolean,
  meeting_rooms boolean,
  tennis_courts boolean,
  free_parking boolean,
  breakfast_buffet boolean,
  shuttle_bus_service boolean,
  security boolean,
  concierge boolean,
  currency_exchange boolean,
  non_smoking_hotel boolean,
  sun_loungers_beach_chairs boolean,
  door_person boolean,
  shops boolean,
  PRIMARY KEY (id)
);

CREATE TABLE room_features (
  id int,
  air_conditioning boolean,
  room_service boolean,
  flatscreen_tv boolean,
  safe boolean,
  wake_up_service boolean,
  housekeeping boolean,
  iron boolean,
  balcony boolean,
  private_beach boolean,
  additional_bathroom boolean,
  interconnected_rooms_available boolean,
  kitchenette boolean,
  laptop_safe boolean,
  vip_room_facilities boolean,
  refrigerator boolean,
  private_balcony boolean,
  sofa boolean,
  dvd_cd_player boolean,
  microwave boolean,
  PRIMARY KEY (id)
);

CREATE TABLE room_types (
  id int,
  ocean_view boolean,
  suites boolean,
  family_rooms boolean,
  non_smoking_rooms boolean,
  PRIMARY KEY (id)
);

CREATE TABLE images (
  id int,
  image_id smallint,
  image_url varchar,
  PRIMARY KEY ((id, image_id))
);

CREATE INDEX ON images(id);
