import express from 'express';
import Helper from '../Helpers';
import {createNewOrder, getAllOrders, getAnOrder, updateOrder} from '../Controller'
// import orders from '../Order.json'
let router = express.Router();

router.get('/',Helper.veryifyToken, getAllOrders)
router.get('/:id',Helper.veryifyToken, getAnOrder)
router.put('/:id', updateOrder)
router.post('/', Helper.veryifyToken, createNewOrder)

export default router;