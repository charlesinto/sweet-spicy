import app from '../index'
import chai from 'chai';
import chaiHttp from 'chai-http'
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

let order = {
    "order":"fried rice",
    "quantity": "5",
    "amount": "7000"
}
let request = {
    "order":"champagne",
    "quantity": "1",
    "amount": 5000
}
describe('Test all api end points', function(){
    describe('It should get all orders', function(){
        this.timeout(20000);
        it('response should have a status of 200',(done)=>{
            chai.request(app).get('/api/v1/orders').end(function(err,res){
                
                expect(res).to.have.status(200);
                done();
            })
        })
        it('response should be an object', function(done){
            chai.request(app).get('/api/v1/orders').end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.text to be a string', function(done){
            chai.request(app).get('/api/v1/orders').end(function(err,res){
                expect(res.text).to.be.string
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).get('/api/v1/orders').end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('response to have property requests', function(done){
            chai.request(app).get('/api/v1/orders').end(function(err,res){
                expect(res.body).to.have.property('order');
                done();
            })
        })
        it('response.message to be operation successful', function(done){
            chai.request(app).get('/api/v1/orders').end(function(err,res){
            
                expect(res.body.message).to.equal("operation successful")
                done();
            })
        })
        it('request should be an array', function(done){
            chai.request(app).get('/api/v1/orders').end(function(err,res){
            
                expect(res.body.order).to.be.an('array')
                done();
            })
        })
    })
    describe('It should get order by id', function(){
        this.timeout(20000);
        it('response should have a status of 200',(done)=>{
            chai.request(app).get('/api/v1/orders/2').end(function(err,res){
                
                expect(res).to.have.status(200);
                done();
            })
        })
        it('response should be an object', function(done){
            chai.request(app).get('/api/v1/orders/2').end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.text to be a string', function(done){
            chai.request(app).get('/api/v1/orders/2').end(function(err,res){
                expect(res.text).to.be.string
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).get('/api/v1/orders/2').end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('response to have property requests', function(done){
            chai.request(app).get('/api/v1/orders/2').end(function(err,res){
                expect(res.body).to.have.property('order');
                done();
            })
        })
        it('response.message to be operation successful', function(done){
            chai.request(app).get('/api/v1/orders/2').end(function(err,res){
            
                expect(res.body.message).to.equal("operation successful")
                done();
            })
        })
        it('request should be an array', function(done){
            chai.request(app).get('/api/v1/orders/2').end(function(err,res){
            
                expect(res.body.order).to.be.an('array')
                done();
            })
        })
    })
    describe('It should update an order by id', function(){
        this.timeout(20000);
        it('response should have a status of 201',(done)=>{
            chai.request(app).put('/api/v1/orders/12').type('form').send(order).end(function(err,res){
                
                expect(res).to.have.status(201);
                done();
            })
        })
        it('response should be an object', function(done){
            chai.request(app).put('/api/v1/orders/12').type('form').send(order).end(function(err,res){
                expect(res).to.be.an('object');
                done();
            })
        })
        it('response.text to be a string', function(done){
            chai.request(app).put('/api/v1/orders/12').type('form').send(order).end(function(err,res){
                expect(res.text).to.be.string
                done();
            })
        })
        it('response to have property message', function(done){
            chai.request(app).put('/api/v1/orders/12').type('form').send(order).end(function(err,res){
                expect(res.body).to.have.property('message');
                done();
            })
        })
        it('response to have property requests', function(done){
            chai.request(app).put('/api/v1/orders/12').type('form').send(order).end(function(err,res){
                expect(res.body).to.have.property('order');
                done();
            })
        })
        it('response.message to be operation successful', function(done){
            chai.request(app).put('/api/v1/orders/12').type('form').send(order).end(function(err,res){
            
                expect(res.body.message).to.equal("update successful")
                done();
            })
        })
        it('request should be an array', function(done){
            chai.request(app).put('/api/v1/orders/12').type('form').send(order).end(function(err,res){
            
                expect(res.body.order).to.be.an('array')
                done();
            })
        })
    })
    describe('It should create a new order', function(){
        this.timeout(20000);
        it('response should have a status of 201',(done)=>{
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
                
                expect(res).to.have.status(201);
                done();
            })
        })
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
        it('response to have property requests', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
                expect(res.body).to.have.property('order');
                done();
            })
        })
        it('response.message to be operation successful', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
            
                expect(res.body.message).to.equal("order posted successful")
                done();
            })
        })
        it('request should be an array', function(done){
            chai.request(app).post('/api/v1/orders').type('form').send(request).end(function(err,res){
            
                expect(res.body.order).to.be.an('array')
                done();
            })
        })
    })
})