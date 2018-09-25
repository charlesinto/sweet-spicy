import express from 'express';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import route from './route'
import orders from './route/orders';
import auth from './route/auth';
import menuRoute from './route/menuRoute'
require('dotenv').config();

const apiVersion = express.Router();
const app = express();
app.use(express.static(path.join(__dirname, 'UI')));
app.use(express.static('UI'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/auth', auth)
app.use('/api/v1/orders', orders);
app.use('/api/v1/menu', menuRoute);

let port = process.env.PORT || 5000;
let server = http.createServer(app)
let io = socket().listen(server);
io.on('connection', (socket)=>{
    console.log(`user connected, id: ${socket.id}`);
   
})

server.listen(port,()=>{console.log(`server is listening on port ${port}`)});

export default server;