import Helper from '../Helpers';
import order from '../Orders';

export const updateOrder = (req, res) => {
    // let order = JSON.parse(userOrder);
    if(/^\d+$/.test(req.params.id)){
        let requestId = parseInt(req.params.id);
        console.log(req.body)
        let request = Helper.trimWhiteSpace(req.body);
        if( !Helper.validateKey(request, ["itemname","quantity","unit_price"])){
            res.statusCode = 400;
            res.setHeader('content-type', 'application/json');
            return res.json({message:'Bad Request,one or more keys is missing'});
        }
        if( Helper.validateInput(res, request)){
            let itemIndex = 0;
            let arrayOrderToUpdate = order.filter((item, index) => {
                for(let i = 0; i< item.order.length ; i++ ){
                    if(item.order[i].batchId === requestId){
                        itemIndex = index
                        return true;
                    }
                }
            })
            let updateToOrder = {};
            let mi2 = JSON.parse(JSON.stringify(arrayOrderToUpdate[0].order)) ;
            let foundId = 0;
            mi2.forEach(item => {
                    if(item.batchId == requestId){
                        updateToOrder = item;
                    }
            })
            let price = 0;
            mi2.forEach(item => {
                if(item.batchId === requestId){
                    item.itemname = request.itemname;
                    item.quantity =request.quantity;
                    item.unit_price = request.unit_price;
                    price = request.unit_price

                }
            })
            let update = {
            orderid: arrayOrderToUpdate[0].orderid,
            status: arrayOrderToUpdate[0].status,
            userid: arrayOrderToUpdate[0].userid,
                newOrder: {
                    itemname: request.itemname,
                    quantity: request.quantity,
                    unit_price: price
                }
            }
            if(arrayOrderToUpdate.length > 0){
                order.forEach(element => {
                    for(let  i= 0; i < element.order.length; i++){
                        if(element.order[i].batchId === requestId){
                            element.order[i].itemname = request.itemname;
                            element.order[i].quantity = request.quantity;
                            element.order[i].unit_price = request.unit_price;
                        }
                    }
                })
                //update array
                order.splice(itemIndex,1)
                order.push({orderid:update.orderid,userid:update.userid,status:update.status,order:mi2})
                res.statusCode = 201;
                    res.setHeader('content-type', 'application/json');
                    res.json({
                        message:`update successful`,
                        order: update
                        
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
    }else{
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`Bad request`
            
        })
    }
}
