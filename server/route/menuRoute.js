import express from 'express';
import { getMenu } from '../Controller';
// import orders from '../Order.json'
let router = express.Router();

router.get('/', getMenu)


export default router;