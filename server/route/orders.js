import express from 'express';
// import orders from '../Order.json'
let router = express.Router();

let order = [
    {
        "orderid": 1,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 31,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 30,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 29,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 29,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 28,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 27,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 26,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 25,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 24,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 23,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 22,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 21,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 10,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 11,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 12,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 17,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 16,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 15,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 18,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    },
    {
        "orderid": 9,
        "quantity": 4,
        "amount": 10000,
        "order":"rice"
    }

]


router.get('/', function (req,res){
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.json({
        message:`operation successful`,
        order
        
    })
})
router.get('/:id',function(req,res){
    let requestId = parseInt(req.params.id);
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.json({
        message:`operation successful`,
        order: order.filter(item => item.orderid === requestId)
        
    })
})
export default router;