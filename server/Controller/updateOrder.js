import Helper from '../Helpers';
import order from '../Orders';

export const updateOrder = (req, res) => {
    let requestId = parseInt(req.params.id);
    let request = Helper.trimWhiteSpace(req.body);
    if( !Helper.validateKey(request, ["order", "quantity", "amount"])){
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        return res.json({message:'Bad Request,one or more keys is missing'});
    }
    if( Helper.validateInput(res, request)){
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
}
