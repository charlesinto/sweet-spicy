import app from '../index'
import chai from 'chai';
import chaiHttp from 'chai-http'
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjgsImZpcnN0bmFtZSI6ImRpbmR1IiwibGFzdG5hbWUiOiJvbnVvcmFoIiwicm9sZWlkIjoxLCJlbWFpbCI6ImR1QGdtYWlsLmNvbSIsImlhdCI6MTUzNzg2NjMyNCwiZXhwIjoxNTM4NDcxMTI0fQ.Cj2LABp8Tqr9v6p1i1RTmi1XauM2Bi19GDSfbEz0dFM'

let user = {
	"email":"charls.onuorah12@yahoo.com",
	"password":"3450"
}
let order = {
    "itemname":"fried rice",
    "quantity": "5",
    "unit_price": "7000",
    "itemid": 10
}
let userorder = {
	
	"items": [
		{
		"itemid": 1,
		"itemname":"rice",
		"quantity":5,
		"unit_price": 100,
		"amountordered":500
		},
		{
		"itemid": 1,
		"itemname":"beans",
		"quantity":5,
		"unit_price": 100,
		"amountordered":500
		},
		{
		"itemid": 1,
		"itemname":"garri",
		"quantity":5,
		"unit_price": 100,
		"amountordered":500
		}
	
		
		]
}
let request= {
	order:[
				{
			itemname:"chicken",
			quantity:"10",
			amount:"1000",
			itemid:"40"
			
		}	
	],
    userid: 1
    
}
let createuser = {
	"phonenumber":"08163113450",
	"email":"charles.onuorah1@yahoo.com",
	"firstname":"charles",
	"lastname":"onuorah",
	"password":"3450"
}
describe('Test all api end points', function(){
    describe('It should update an order by id', function(){
        this.timeout(20000);
        it('response should have a status of 201',(done)=>{
            chai.request(app).put('/api/v1/orders/1').type('form').send(order).end(function(err,res){
                
                expect(res).to.have.status(201);
                done();
            })
        })
        it('response should be an object', function(done){
            chai.request(app).put('/api/v1/orders/1').type('form').send(order).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.text to be a string', function(done){
            chai.request(app).put('/api/v1/orders/1').type('form').send(order).end(function(err,res){
                expect(res.text).to.be.string
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).put('/api/v1/orders/1').type('form').send(order).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('response to have property requests', function(done){
            chai.request(app).put('/api/v1/orders/1').type('form').send(order).end(function(err,res){
                expect(res.body).to.have.property('requstUpdate');
                done();
            })
        })
        it('response.message to be operation successful', function(done){
            chai.request(app).put('/api/v1/orders/1').type('form').send(order).end(function(err,res){
            
                expect(res.body.message).to.equal("update successful")
                done();
            })
        })
        it('request should be an array', function(done){
            chai.request(app).put('/api/v1/orders/1').type('form').send(order).end(function(err,res){
            
                expect(res.body.requstUpdate).to.be.an('array')
                done();
            })
        })
    })
    describe('It should create a new order', function(){
        this.timeout(20000);
        it('response should be an object', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.text to be a string', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
                expect(res.text).to.be.string
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
    })
    describe('It should login a new order', function(){
        this.timeout(20000);
        it('response should be an object', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.text to be a string', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
                expect(res.text).to.be.string
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
    })
    describe('It should login a new user', function(){
        this.timeout(20000);
        it('response should have a status of 200',(done)=>{
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res).to.have.status(200);
                done();
            })
        })
        it('response should be an object', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.text to be a string', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.text).to.be.string
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('response message to be string', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body.message).to.be.string;
                done();
            })
        })
        it('response to have property token', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('token');
                done();
            })
        })
        it('response to have property roleid', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('roleid');
                done();
            })
        })
        it('response to have property user', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('user');
                done();
            })
        })
        it('response user to be a string', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body.user).to.be.string;
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).post('/api/v1/auth/login').type('form').send(user).end(function(err,res){
                expect(res.body).to.have.property('rolename');
                done();
            })
        })
    })
    describe('it should sign up a user',() => {
        this.timeout(40000);
        it('response should be an object', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        
        it('response should have a status of 201',(done)=>{
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                
                expect(res).to.have.status(201);
                done();
            })
        })
        it('response to have property token', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('token');
                done();
            })
        })
        it('response to have property roleid', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('roleid');
                done();
            })
        })
        it('response to have property rolename', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('rolename');
                done();
            })
        })
        it('response to have property useremail', function(done){
            chai.request(app).post('/api/v1/auth/signup').type('form').send(createuser).end(function(err,res){
                expect(res.body).to.have.property('useremail');
                done();
            })
        })
    })
    describe('it should get store menu',() => {
        this.timeout(40000);
        it('res should be an object', function(done){
            chai.request(app).get('/api/v1/menu').type('form').end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.body to have property message', function(done){
            chai.request(app).get('/api/v1/menu').type('form').end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('response.message should be operation successful', function(done){
            chai.request(app).get('/api/v1/menu').type('form').end(function(err,res){
                expect(res.body.message).to.equal(`operation successful`)
                done();
            })
        })
        it('response should have  status of 200',(done)=>{
            chai.request(app).get('/api/v1/menu').type('form').end(function(err,res){
                
                expect(res).to.have.status(200);
                done();
            })
        })
        it('response body to have property menu', function(done){
            chai.request(app).get('/api/v1/menu').type('form').end(function(err,res){
                expect(res.body).to.have.property('menu');
                done();
            })
        })
        it('menu should be an array', function(done){
            chai.request(app).get('/api/v1/menu').type('form').end(function(err,res){
                expect(res.body.menu).to.be.an('array');
                done();
            })
        })
    })
    describe('it should post new order',() => {
        this.timeout(40000);
        it('response should be an object', function(done){
            chai.request(app).post('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).send(userorder).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).post('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).send(userorder).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('message should be operation successful', function(done){
            chai.request(app).post('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).send(userorder).end(function(err,res){
                expect(res.body.message).to.equal('operation successful');
                done();
            })
        })
        it('response should have a status of 201',(done)=>{
            chai.request(app).post('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).send(userorder).end(function(err,res){
                
                expect(res).to.have.status(201);
                done();
            })
        })
        it('response to have property items', function(done){
            chai.request(app).post('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).send(userorder).end(function(err,res){
                expect(res.body).to.have.property('items');
                done();
            })
        })
        it('items should be an array', function(done){
            chai.request(app).post('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).send(userorder).end(function(err,res){
                expect(res.body.items).to.be.an('array');
                done();
            })
        })
    })
    describe('it should get user orders',() => {
        this.timeout(40000);
        it('response should be an object', function(done){
            chai.request(app).get('/api/v1/users/8/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).get('/api/v1/users/8/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('message should be operation successful', function(done){
            chai.request(app).get('/api/v1/users/8/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body.message).to.equal('operation successful');
                done();
            })
        })
        it('response should have a status of 200',(done)=>{
            chai.request(app).get('/api/v1/users/8/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                
                expect(res).to.have.status(200);
                done();
            })
        })
        it('response to have property items', function(done){
            chai.request(app).get('/api/v1/users/8/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body).to.have.property('orders');
                done();
            })
        })
        it('items should be an array', function(done){
            chai.request(app).get('/api/v1/users/8/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body.orders).to.be.an('array');
                done();
            })
        })
    })
    describe('it should get all orders',() => {
        this.timeout(40000);
        it('response should be an object', function(done){
            chai.request(app).get('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).get('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('message should be operation successful', function(done){
            chai.request(app).get('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body.message).to.equal('operation successful');
                done();
            })
        })
        it('response should have a status of 200',(done)=>{
            chai.request(app).get('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                
                expect(res).to.have.status(200);
                done();
            })
        })
        it('response to have property items', function(done){
            chai.request(app).get('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body).to.have.property('orders');
                done();
            })
        })
        it('items should be an array', function(done){
            chai.request(app).get('/api/v1/orders').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body.orders).to.be.an('array');
                done();
            })
        })
    })
    describe('it should get an order for admin user',() => {
        this.timeout(40000);
        it('response should be an object', function(done){
            chai.request(app).get('/api/v1/orders/1').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).get('/api/v1/orders/1').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('message should be operation successful', function(done){
            chai.request(app).get('/api/v1/orders/1').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body.message).to.equal('operation successful');
                done();
            })
        })
        it('response should have a status of 200',(done)=>{
            chai.request(app).get('/api/v1/orders/1').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                
                expect(res).to.have.status(200);
                done();
            })
        })
        it('response to have property order', function(done){
            chai.request(app).get('/api/v1/orders/1').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body).to.have.property('order');
                done();
            })
        })
        it('order should be an object', function(done){
            chai.request(app).get('/api/v1/orders/1').type('form').set('content-type', 'application/json').set('authorization', token).end(function(err,res){
                expect(res.body.order).to.be.an('object');
                done();
            })
        })
    })
})
