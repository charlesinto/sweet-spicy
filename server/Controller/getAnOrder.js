import Helper from '../Helpers';
import order from '../Orders';

export const getAnOrder = (req, res) => {
    if(/^\d+$/.test(req.params.id)){
        let requestId = parseInt(req.params.id);
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`operation successful`,
            order: JSON.stringify(order.filter(item => item.orderid === requestId))
            
        })
    }else{
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`Bad request`
        })
    }
    
}
