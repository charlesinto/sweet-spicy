import express from 'express';
import {loginUser} from '../Controller'

let router = express.Router();

router.post('/login', loginUser)

export default router;
