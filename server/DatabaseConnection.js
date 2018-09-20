import pg from 'pg';

require('dotenv').config();
let pool;
console.log('env', process.env.NODE_ENV);
if(process.env.NODE_ENV ==='DEVELOPMENT'){
     pool = new pg.Pool(config);
    const config = {
        user: 'postgres',
        database: 'sweetSpicy', 
        password: 'pa$$word123', 
        port: 5432, 
        max: 20, // max number of connection can be open to database
        idleTimeoutMillis: 50000,
    };
    pool = new pg.Pool(config);
}
else if(process.env.NODE_ENV === 'TEST'){
    //use elephant sql database
    let TEST_DB="postgres:fexheyoxndtkky:634e245a0e1d69ebf4d1d9104e6cbde22e81e8d030b88dcbca3393bedb75febd@ec2-54-83-59-120.compute-1.amazonaws.com:5432/d84nu2ldeehl1j"
     pool = new pg.Pool({
        connectionString:TEST_DB, ssl:true
    });
 }
else{
   // use heroku database
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL , ssl:true
    }); 
    console.log('ev', process.env.DATABASE_URL);
}
export default pool;

