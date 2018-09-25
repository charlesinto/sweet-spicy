import express from 'express';
import {signUp} from '../Controller';
let router = express.Router();

router.post('/signup', signUp)

export default router;
