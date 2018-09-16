import Helper from '../Helpers';
import order from '../Orders';

export const createNewOrder = (req, res) => {
    let request = Helper.trimWhiteSpace(req.body);
    if( !Helper.validateKey(request, ["order", "quantity", "amount"])){
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        return res.json({message:'Bad Request,one or more keys is missing'});
    }
    if( Helper.validateInput(res, request)){
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
}
