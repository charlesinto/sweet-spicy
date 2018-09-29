
[![Build Status](https://travis-ci.com/charlesinto/sweet-spicy.svg?branch=develop-challenge3)](https://travis-ci.com/charlesinto/sweet-spicy)

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
* requires no parameters, retrives all the orders on the database.Only available for user with admin role

#### GET api/v1/orders/:id
* retrives an order with id which must be an integer. Only available for user with admin role

#### PUT api/v1/orders/:id
* updates the status an order with id which must be an integer.Only available for user with admin role. Requires
    * status e.g:
     ` {'status': 'CANCELLED'} `
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

#### POST api/v1/menu
  * Given an admin user, he should be able to add food items to meal. Requires:
    * file with name - myImage
    * itemname - name of the food
    * unit_price - price of the food

## Dependencies
* nodejs
* express
