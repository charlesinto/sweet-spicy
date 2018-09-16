import express from 'express';
import {createNewOrder, getAllOrders, getAnOrder, updateOrder} from '../Controller'
// import orders from '../Order.json'
let router = express.Router();

router.get('/', getAllOrders)
router.get('/:id', getAnOrder)
router.put('/:id', updateOrder)
router.post('/', createNewOrder)

export default router;