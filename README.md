# sweet-spicy
## A fast Food App with the following features
* User can view Menu
* User can login
* User can place order
* User can view Orders
* Admin can Login
* Admin can view Orders
* Admin can attend to Orders
* Admin can upload to Menu
* Admin can Modify Menu
* Admin can create Admin

## ROUTE
#### POST api/v1/orders
* Required paramters
  * token - can set in the header with the key authoriztion or added to the request body
  * items - An array of the orders made by the user. The array contains individual objects thats makes up the order. The keys required are: 
    * itemid
    * itemname
    * unit_price
    * quantity
    * amountordered
#### GET api/v1/orders
* requires no parameters, retrives all the orders on the database

#### GET api/v1/orders/:id
* retrives an order with id which must be an integer

#### PUT api/v1/orders/:id
* updates an order with id which must be an integer, requires
    * itemname
    * quantity
    * unit_price
    * itemid
#### POST api/v1/auth/login
* logs a user in. Requires:
  * email
  * password

#### POST api/v1/auth/sigups
* signs a user up. Requires:
  * email
  * password
  * phonenumber
  * firstname
  * lastname
#### GET api/v1/users/userid/orders
  * Gets the order history of a particular logged in user with the id - userid
      * userid should be a number
## Dependencies
* nodejs
* express
