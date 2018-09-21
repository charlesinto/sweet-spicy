import express from 'express';
import {signUp} from '../Controller';
// import orders from '../Order.json'
let router = express.Router();

router.post('/signup', signUp)

export default router;
