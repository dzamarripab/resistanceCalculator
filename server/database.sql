-- Create the database (if it doesn't exist)
CREATE DATABASE resistor_calculator;

-- Create a schema for the database
CREATE SCHEMA resistor_code;

-- Create a table for resistor colors
CREATE TABLE resistor_colors (
  id SERIAL PRIMARY KEY,
  color VARCHAR(255) NOT NULL,
  value INT NOT NULL,
  multiplier INT NOT NULL,
  tolerance INT NOT NULL
);

-- Insert color values into the table
INSERT INTO resistor_colors (color, value, multiplier, tolerance)
VALUES
  ('black', 0, 1, 20),
  ('brown', 1, 10, 1),
  ('red', 2, 100, 2),
  ('orange', 3, 1000, 3),
  ('yellow', 4, 10000, 4),
  ('green', 5, 100000, 0);