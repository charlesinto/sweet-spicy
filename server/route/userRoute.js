import express from 'express';
import Helper from '../Helpers';
import { getUserOrders } from '../Controller'

let router = express.Router()

router.get('/:id/orders', Helper.veryifyToken, getUserOrders)
export default router;