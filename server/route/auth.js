import express from 'express';
import {loginUser, signUp} from '../Controller'

let router = express.Router();

router.post('/login', loginUser)
router.post('/signup', signUp)
export default router;
