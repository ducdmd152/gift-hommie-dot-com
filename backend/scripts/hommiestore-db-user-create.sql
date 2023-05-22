CREATE USER 'hommiestore'@'localhost' IDENTIFIED BY 'hommiestore';

GRANT ALL PRIVILEGES ON * . * TO 'hommiestore'@'localhost';

ALTER USER 'hommiestore'@'localhost' IDENTIFIED WITH mysql_native_password BY 'hommiestore';