import pg from 'pg';
/**
 * Creates a connection to database.
 *
 * 
 * @author: charles onuorah
 * 
 *
 */
require('dotenv').config();
let pool;
if(process.env.NODE_ENV ==='DEVELOPMENT'){
<<<<<<< HEAD
     
    const config = {
<<<<<<< HEAD
        user: process.env.DB_USER,
=======
    const config = {
        user:process.env.DB_USER,
>>>>>>> feat/160480263/user-should-login
        database: process.env.LOCAL_DB, 
        password: process.env.DB_PASSWORD, 
=======
        user: DB_USER,
        database: LOCAL_DB, 
        password: DB_PASSWORD, 
>>>>>>> feat/160480271/user-signup-endpoint
        port: 5432, 
        max: 20, // max number of connection can be open to database
        idleTimeoutMillis: 50000,
    };
     pool = new pg.Pool(config);
    
}
else if(process.env.NODE_ENV === 'TEST'){
     pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
 }
else{
    pool = new pg.Pool({
        connectionString: process.env.PRODUCTION_DB , ssl:true
    }); 
}
export default pool;

