DROP DATABASE IF EXISTS CMS;
CREATE DATABASE CMS;
USE CMS;
CREATE TABLE credentials(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(65) NOT NULL,
    type VARCHAR(7) NOT NULL,
    status VARCHAR(8) DEFAULT 'allowed',
    PRIMARY KEY (id)
);
CREATE TABLE teacher(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    assigned_classes TINYINT NOT NULL DEFAULT '0',
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES credentials(id)
);
CREATE TABLE student(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    enrolled_classes TINYINT NOT NULL DEFAULT '0',
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES credentials(id)
);
CREATE TABLE classroom(
    class_id VARCHAR(5) NOT NULL,
    teacher_id INT NOT NULL,
    class_name VARCHAR(30) NOT NULL,
    enrolled_students INT NOT NULL DEFAULT '0',
    date DATE NOT NULL,
    PRIMARY KEY (class_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);
CREATE TABLE enroll(
    stud_id INT NOT NULL,
    class_id VARCHAR(5) NOT NULL,
    assignment TINYINT DEFAULT '0',
    quiz TINYINT DEFAULT '0',
    project TINYINT DEFAULT '0',
    PRIMARY KEY (stud_id,class_id),
    FOREIGN KEY (stud_id) REFERENCES student(id),
    FOREIGN KEY (class_id) REFERENCES classroom(class_id) ON DELETE CASCADE
);
CREATE TABLE post(
    post_id INT NOT NULL AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    class_id VARCHAR(5) NOT NULL,
    title VARCHAR(80) NOT NULL,
    content VARCHAR(2500) NOT NULL,
    PRIMARY KEY (post_id, class_id),
    FOREIGN KEY (teacher_id) REFERENCES classroom(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classroom(class_id) ON DELETE CASCADE
);
CREATE TABLE inbox(
    message_id INT NOT NULL AUTO_INCREMENT,
    sender INT NOT NULL,
    receiver INT NOT NULL,
    subject VARCHAR(80) NOT NULL,
    content VARCHAR(2500) NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (sender) REFERENCES credentials(id),
    FOREIGN KEY (receiver) REFERENCES credentials(id)
);
CREATE TABLE disallowed(
    stud_id INT NOT NULL,
    class_id VARCHAR(5) NOT NULL,
    PRIMARY KEY (stud_id,class_id),
    FOREIGN KEY (stud_id) REFERENCES student(id),
    FOREIGN KEY (class_id) REFERENCES classroom(class_id) ON DELETE CASCADE
);
CREATE TABLE deleted_classroom(
    class_id VARCHAR(5) NOT NULL,
    teacher_id INT NOT NULL,
    class_name VARCHAR(30) NOT NULL,
    enrolled_students TINYINT NOT NULL DEFAULT '0',
    date DATE NOT NULL,
    PRIMARY KEY (class_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);
DELIMITER //
CREATE TRIGGER after_classroom_delete
    AFTER DELETE
        ON classroom FOR EACH ROW 
BEGIN
    UPDATE teacher SET assigned_classes=(SELECT COUNT(class_id) FROM classroom WHERE teacher_id=teacher.id) WHERE assigned_classes>=0;
    UPDATE student SET enrolled_classes=(SELECT COUNT(class_id) FROM enroll WHERE stud_id=student.id) WHERE enrolled_classes>=0;
end;//

DELIMITER ;
INSERT INTO credentials (username,password,type,status)
VALUES ('shahbaz42000','$2b$12$l1sRNYO7Ja3c6wlGXMGqzu572uEYbzM0xHG72QamxSooi1BNct/EO','admin','root');

