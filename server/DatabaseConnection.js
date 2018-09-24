import pg from 'pg';
<<<<<<< HEAD
import {Client} from 'pg';
=======
/**
 * Creates a connection to database.
 *
 * 
 * @author: charles onuorah
 * 
 *
 */
>>>>>>> develop-challenge3
require('dotenv').config();
let pool;
if(process.env.NODE_ENV ==='DEVELOPMENT'){
     
    const config = {
<<<<<<< HEAD
        user: process.env.DB_USER,
        database: process.env.LOCAL_DB, 
        password: process.env.DB_PASSWORD, 
=======
        user: DB_USER,
        database: LOCAL_DB, 
        password: DB_PASSWORD, 
>>>>>>> develop-challenge3
        port: 5432, 
        max: 20, // max number of connection can be open to database
        idleTimeoutMillis: 50000,
    };
     pool = new pg.Pool(config);
    
}
else if(process.env.NODE_ENV === 'TEST'){
     pool = new pg.Pool({
<<<<<<< HEAD
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
=======
        connectionString:DATABASE_URL, ssl:true
    });
>>>>>>> develop-challenge3
 }
else{
    pool = new pg.Pool({
        connectionString: process.env.PRODUCTION_DB , ssl:true
    }); 
}
export default pool;

