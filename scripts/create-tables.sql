CREATE TABLE IF NOT EXISTS packages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  days INT,
  adults INT,
  destination_type VARCHAR(100),
  duration_category VARCHAR(100),
  package_type VARCHAR(100),
  rating NUMERIC(2,1),
  badge VARCHAR(50),
  image_url TEXT,
  terms_conditions TEXT,
  exclusions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS itinerary_details (
  id SERIAL PRIMARY KEY,
  package_id INT NOT NULL,
  day_number INT,
  title VARCHAR(255),
  description TEXT,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS flight_details (
  id SERIAL PRIMARY KEY,
  package_id INT NOT NULL,
  type VARCHAR(50),
  airline VARCHAR(100),
  flight_number VARCHAR(50),
  class VARCHAR(50),
  departure_from VARCHAR(100),
  departure_time TIME,
  arrival_at VARCHAR(100),
  arrival_time TIME,
  description TEXT,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hotel_details (
  id SERIAL PRIMARY KEY,
  package_id INT NOT NULL,
  hotel_name VARCHAR(255),
  city VARCHAR(100),
  nights INT,
  star_rating INT,
  description TEXT,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS visa_details (
  id SERIAL PRIMARY KEY,
  package_id INT NOT NULL,
  country VARCHAR(100),
  visa_type VARCHAR(100),
  processing_time VARCHAR(100),
  fee NUMERIC(10,2),
  requirements TEXT,
  description TEXT,
  FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS custom_package_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  destination VARCHAR(255),
  travel_date DATE,
  travelers INT,
  budget VARCHAR(100),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);