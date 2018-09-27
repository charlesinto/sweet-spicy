CREATE TABLE BASE_ORDER(id serial, orderid BIGINT not null, userid integer not null,itemid integer
					   not null,itemname varchar(50) not null,unit_price integer not null,
						quantity BIGINT not null,amountordered BIGINT not null, discount integer,
					   status varchar(50) not null, BillTo varchar(100),dateordered timestamp not null);

INSERT INTO BASE_ORDER(itemname,itemid, unit_price,quantity,amountordered,orderid,status,dateordered,userid) VALUES
        ('rice',1,100, 5,500,3749, 'PENDING', NOW(), 8),
        ('beans',1,100, 5,500,3749, 'PENDING', NOW(), 8),
        ('garri',1,100, 5,500,3749, 'PENDING', NOW(), 8);
    