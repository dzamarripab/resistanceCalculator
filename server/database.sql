-- Create the database (if it doesn't exist)
CREATE DATABASE resistor_calculator;

-- Create a user for the database
CREATE USER resistor_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE resistor_calculator TO resistor_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO resistor_user;

-- Create a table for resistor colors
CREATE TABLE resistor_colors (
    id SERIAL PRIMARY KEY,
    color VARCHAR(255) NOT NULL,
    value INT,
    multiplier REAL,
    tolerance REAL
);

-- Insert color values into the table
INSERT INTO resistor_colors (color, value, multiplier, tolerance) VALUES
('Black', 0, 1, NULL),
('Brown', 1, 10, 1),
('Red', 2, 100, 2),
('Orange', 3, 1000, 0.05),
('Yellow', 4, 10000, 0.02),
('Green', 5, 100000, 0.5),
('Blue', 6, 1000000, 0.25),
('Violet', 7, 10000000, 0.1),
('Gray', 8, 100000000, 0.05),
('White', 9, 1000000000, NULL),
('Gold', NULL, 0.1, 5),
('Silver', NULL, 0.01, 10);