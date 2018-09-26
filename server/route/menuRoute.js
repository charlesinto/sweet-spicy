import express from 'express';
import { getMenu, addToMenu } from '../Controller';
import Helpers from '../Helpers';
// import orders from '../Order.json'
let router = express.Router();

router.get('/', getMenu)
router.post('/',Helpers.veryifyToken, addToMenu)


export default router;