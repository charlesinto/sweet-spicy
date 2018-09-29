import express from 'express';
import Helper from '../Helpers';
import {createNewOrder, getAllOrders, getAnOrder, updateOrder} from '../Controller'
let router = express.Router();

router.get('/',Helper.veryifyToken, getAllOrders)
router.get('/:id',Helper.veryifyToken, getAnOrder)
router.put('/:id',Helper.veryifyToken, updateOrder)
router.post('/', Helper.veryifyToken, createNewOrder)

export default router;