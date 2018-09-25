CREATE TABLE IF NOT EXISTS BASE_USER(
    userid serial,
    firstname varchar(50),
    lastname varchar(50),
    email varchar(250),
    password varchar(300),
    phonenumber varchar(25),
    roleid integer,
    rolename varchar(100)
    datecreated timestamp,
);

INSERT INTO BASE_USER(firstname,lastname,email,password,phonenumber,
roleid,rolename,datecreated) values (
    'charles','onuorah','charls.onuorah12@yahoo.com','$2b$10$S/qYFt5lG7Z9K.WKA5geXe49qiGsuPIETcfYqV1zjLV7DY58ePTiC'
    ,'08163113450',1,'SUPER ADMINISTRATOR',NOW()
)