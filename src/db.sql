CREATE TABLE organizers (id INT PRIMARY KEY AUTO_INCREMENT, userName VARCHAR(20), password TEXT);
INSERT INTO organizers (userName, password) VALUES ('first1', '123');
SELECT * FROM organizers;

CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT, vardas VARCHAR(20), pavarde VARCHAR(20), pastas VARCHAR(30), amzius INT, organizerId INT);
INSERT INTO users (vardas, pavarde, pastas, amzius, organizerId) VALUES ('user1', 'suser1', 'user1@pastas.lt', 50, 1);
SELECT * FROM users;
 
 
 