import Helper from '../Helpers';
import order from '../Orders';
import Helpers from '../Helpers';

export const createNewOrder = (req, res) => {
    console.log(req.body)
    if(!Helpers.validateKey(req.body,['order','userid'])){
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        return res.json({message:'Bad Request,one or more keys is missing'});
    }
    if(typeof req.body.order == 'object' && typeof req.body.order.length !== "undefined"){
        let request = []
        for(let i = 0; i< req.body.order.length; i++){
            console.log(req.body.order[i]);
            let re = Helper.trimWhiteSpace(req.body.order[i])
            console.log(re);
            if(!Helpers.validateKey(re,["itemname", "quantity", "amount","itemid"])){
                res.statusCode = 403;
                res.setHeader('content-type', 'application/json');
                return res.json({message:'Bad Request,one or more keys is missing'});
            }
            else if(Helper.validateInput(res, Helper.trimWhiteSpace(req.body.order[i]))) {
                request.push(req.body.order[i])
            }else{
                res.statusCode = 401;
                res.setHeader('content-type', 'application/json');
                res.json({
                    message:`operation failed`,
                    order:[]
                    
                })
            }
        }
        order.push({order:request,userid: req.body.userid});
        res.statusCode = 201;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`order posted successful`,
            order: request
            
        })
    }
}
