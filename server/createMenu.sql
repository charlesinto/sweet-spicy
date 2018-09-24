
CREATE TABLE BASE_MENU(itemid serial,itemname varchar(50) not null,unit_price integer not null,
					  url varchar(500) not null, discount integer,unit varchar(20),itemcode varchar(20),
					   datecreated timestamp not null);

INSERT INTO BASE_MENU(itemname,unit_price,url,datecreated)
values
('ice cream',400,'/asset/ice-cream.jpg', NOW()),
('yam sauce',300,'/asset/yam-sauace.jpg', NOW()),
('yam porridge',500,'/asset/yam-porridge.jpg', NOW()),
('pepper soup',500,'/asset/pepper-soup.jpg', NOW()),
('thai rice',300,'/asset/thai-food.jpg', NOW()),
('ewedu soup',600,'/asset/ewedu-soup.jpg', NOW()),
('grilled chicken',1000,'/asset/grilled-chicken.jpg', NOW()),
('fried plaintain wit egg sauce',300,'/asset/fried-plantain-and-egg-sauce.jpg', NOW()),
('fried chicken',700,'/asset/golden-fried-chicken.jpg', NOW()),
('jellof rice',300,'/asset/rice-1.jpg', NOW()),
('african salad',700,'/asset/african-salad-abacha.jpg', NOW()),
('bean porridge',400,'/asset/Beans-porridge-and-fried-plantain.jpg', NOW());