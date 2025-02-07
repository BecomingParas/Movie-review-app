CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  release_year INT,
  genre VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  rating INT NOT NULL, 
  review TEXT,
  movieId INT,
  FOREIGN KEY (movieId) REFERENCES movies(id) 
);
