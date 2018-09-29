CREATE TABLE BASE_ORDER(id serial, orderid BIGINT not null, userid integer not null,itemid integer
					   not null,itemname varchar(50) not null,unit_price integer not null,
						quantity BIGINT not null,amountordered BIGINT not null, discount integer,
					   status varchar(50) not null, BillTo varchar(100),dateordered timestamp not null);