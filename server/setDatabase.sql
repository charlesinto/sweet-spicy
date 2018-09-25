CREATE TABLE BASE_USER(userid SERIAL, firstname varchar(50), lastname varchar(50),
					  email varchar(100),password varchar(100), phonenumber
					  varchar(50), roleid int, rolename varchar(50), datecreated timestamp);