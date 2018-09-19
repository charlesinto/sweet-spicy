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
  * order must be an array of objects containing
     * itemname
     * itemid
     * quantity
     * amount
  * userid - this is the id of the user making the order
#### GET api/v1/order
* requires no parameters, retrives all the orders on the database

#### GET api/v1/orders/:id
* retrives an order with id which must be an integer

#### PUT api/v1/orders/:id
* updates an order with id which must be an integer, requires
    * itemname
    * quantity
    * unit_price

## Dependencies
* nodejs
* express