import express from 'express';
import ValidateKeys from '../services/validateKeys';
import InputValidate from '../services/inputValidator';
import trimSpace from '../services/trimWhiteSpace'
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
router.put('/:id', (req,res) => {
    let requestId = parseInt(req.params.id);
    let request = trimSpace(req.body);
    if( !ValidateKeys(request, ["order", "quantity", "amount"])){
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        return res.json({message:'Bad Request,one or more keys is missing'});
    }
    if( InputValidate(res, request)){
       let arrayOrderToUpdate = order.filter(item => item.orderid === requestId)
       if(arrayOrderToUpdate.length > 0){
           order.forEach(element => {
               if(element.orderid === requestId){
                   element.order = request.order;
                   element.quantity = request.quantity
               }
           })
           res.statusCode = 201;
            res.setHeader('content-type', 'application/json');
            res.json({
                message:`update successful`,
                order: order.filter(item => item.orderid === requestId)
                
            })
       }else{
            res.statusCode = 404;
            res.setHeader('content-type', 'application/json');
            res.json({
                message:`order not found`,
                order:[]
                
            })
       }
    }

})

router.post('/', (req,res)=> {
    let request = trimSpace(req.body);
    if( !ValidateKeys(request, ["order", "quantity", "amount"])){
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        return res.json({message:'Bad Request,one or more keys is missing'});
    }
    if( InputValidate(res, request)){
        order.push(request);
        res.statusCode = 201;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`order posted successful`,
            order: [request]
            
        })
         
    }else{
        res.statusCode = 401;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`operation failed`,
            order:[]
            
        })
    }
     
})
export default router;