CREATE DATABASE user_credentials;
CREATE DATABASE trips;
CREATE DATABASE accounts;

SELECT datname AS database_name
FROM pg_database;