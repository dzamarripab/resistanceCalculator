# Resistor Ohm Value Calculator

A full-stack application with a React frontend and Node.js backend to calculate resistor values based on color bands.

## Prerequisites

- **Node.js & npm**
- **PostgreSQL**
- **An SQL client** like pgAdmin or DBeaver (optional, but helpful)

## Setting Up the Project

### 1. Install Dependencies

Navigate to both the `client` and `server` directories and run:


`bash`
```
npm install
```

This installs necessary dependencies for both frontend and backend.

### 2. Create the .env File
Inside your server directory, create a .env file with the following contents:

```
PORT=3001
DATABASE_HOST=localhost
DATABASE_USER=resistor_user
DATABASE_PASSWORD=your_secure_password
DATABASE_NAME=resistor_calculator
```

### 3. Setting Up PostgreSQL

- Install PostgreSQL
- Download [PostgreSQL from the official site](https://www.postgresql.org/download/).
- Follow the installation steps. Remember the password you set for the postgres user.

- Create the Database
Using `psql`:

`bash`
```
psql -U postgres
```

Enter the `postgres` user password when prompted, then:

`sql`
```
CREATE DATABASE resistor_calculator;
```

- Setting Up a User
It's recommended not to use the postgres superuser for application connections. Instead, create a new user:
`sql`
```
CREATE USER resistor_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE resistor_calculator TO resistor_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO resistor_user;
```

### 4. Initialize the Tables
Using psql:

`bash`
```
psql -U resistor_user -d resistor_calculator
```

Now create your tables and insert the initial data. This might include the resistor_colors table and any other necessary data.

`sql`
```
CREATE TABLE resistor_colors (
    id SERIAL PRIMARY KEY,
    color VARCHAR(255) NOT NULL,
    value INT,
    multiplier REAL,
    tolerance REAL
);

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
```


### 5. Running the Application
For the backend, navigate to the server directory:
</br>
`cd server`
</br>
`bash`

```
npm start
```

For the frontend, in a separate terminal, navigate to the client directory:
</br>
`cd client`
</br>
`bash`
```
npm start
```

Accessing the App
Once running, access the app through a browser:
http://localhost:3000/ (assuming the React app runs on port 3000)

Using the App

Input the color bands for a resistor.
Click "Calculate" to get the resistor's ohm value and tolerance.
