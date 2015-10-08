-- Create game table
CREATE TABLE IF NOT EXISTS game (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(1024),
    status TINYINT(4),
    start_time DATE,
    finish_time DATE,
    PRIMARY KEY(id)
) DEFAULT CHARSET=utf8;

-- Create game table
CREATE TABLE IF NOT EXISTS user (
    id INT(11) NOT NULL AUTO_INCREMENT,
    game_id INT(11) NOT NULL, 
    name VARCHAR(32) NOT NULL,
    description VARCHAR(1024),
    status TINYINT(4),
    start_time DATE,
    finish_time DATE,
    PRIMARY KEY(id)
) DEFAULT CHARSET=utf8;
