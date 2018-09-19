import Helper from '../Helpers';
import order from '../Orders';

export const updateOrder = (req, res) => {
    // let order = JSON.parse(userOrder);
    if(/^\d+$/.test(req.params.id)){
        let requestId = parseInt(req.params.id);
        let request = Helper.trimWhiteSpace(req.body);
        if( !Helper.validateKey(request, ["itemid","itemname","quantity","unit_price"])){
            res.statusCode = 400;
            res.setHeader('content-type', 'application/json');
            return res.json({message:'Bad Request,one or more keys is missing'});
        }
        if( Helper.validateInput(res, request)){
            // let mi2 = JSON.parse(JSON.stringify(arrayOrderToUpdate[0].order)) ;
            order.forEach(element => {
                if(element.orderid === requestId){
                    element.order.forEach(item => {
                        if(item.itemid === request.itemid){
                            item.itemname = request.itemname;
                            item.quantity = request.quantity;
                            item.unit_price = request.unit_price
                        }
                    })
                }
            })
            successMessage(res, order, requestId); 
        }else{
                errorMessage(res);
        }
    }else{
        errorMessage();
    }
}

let successMessage = (res,order,requestId) => {
    res.statusCode = 201;
    res.setHeader('content-type', 'application/json');
    res.json({
        message:`update successful`,
        requstUpdate: order.filter(item => item.orderid === requestId)
    })
}
let errorMessage = (res) =>{
    res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`Bad request`
            
        })
}
