-- Create the User table
CREATE TABLE IF NOT EXISTS User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role ENUM('doctor', 'patient') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add any additional constraints or indexes if needed
-- For example, you might want to add an index on the email column for faster queries:
-- CREATE UNIQUE INDEX idx_email ON User (email);

-- Create the Appointment table
CREATE TABLE IF NOT EXISTS Appointment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_reserved BOOLEAN DEFAULT false,
  doctorId INT NOT NULL,
  patientId INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (doctorId) REFERENCES Users(id),
  FOREIGN KEY (patientId) REFERENCES Users(id)
);

-- Add any additional constraints or indexes if needed
-- For example, you might want to add an index on the date column for faster queries:
-- CREATE INDEX idx_date ON Appointment (date);
