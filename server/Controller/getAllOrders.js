import Helper from '../Helpers';
import order from '../Orders';

export const getAllOrders = (req, res) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.json({
        message:`operation successful`,
        order
        
    })
}

