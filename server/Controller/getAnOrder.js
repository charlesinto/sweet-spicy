import Helper from '../Helpers';
import order from '../Orders';

export const getAnOrder = (req, res) => {
    let requestId = parseInt(req.params.id);
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.json({
        message:`operation successful`,
        order: order.filter(item => item.orderid === requestId)
        
    })
}
