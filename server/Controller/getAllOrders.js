import Helper from '../Helpers';
/**
 * Gets all the order placed on the system
 * @param {req,res,env}
 * @return {null}
 */
export const getAllOrders = (req, res) => {
    if(req.token.roleid === 1){
        if(process.env.NODE_ENV === 'TEST'){
            setUpTable()
            .then(() => {
                insertToTable()
                .then(() => getOrders(req,res,'TEST'))
                .catch((err) => errorMessage(res,err))
            })
            .catch((err) => errorMessage(res,err))
        }else{
            getOrders(req,res)
        }
    }else{
        res.statusCode = 406;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`Unathourized user`
            
        })
    }
    
}
/**
 * A function that retrives all order on database
 * @param {req,res,env}
 * @return {null}
 */
const getOrders = (req,res,env) => {
    let sql = 'SELECT * FROM BASE_ORDER';
    Helper.executeQuery(sql)
    .then((result) => {
        if(env === 'TEST'){
            dropTable()
            .then(() => successMessage(res,result))
            .catch((err) => errorMessage(res,err));
        }else{
            successMessage(res,result)
        }
    })
    .catch((err) => {
        errorMessage(res,err);
    })
}
/**
 * set up table when running on test environment.
 * creates table base_order
 */
const setUpTable = () => {
    return new Promise((resolve,reject) => {
        let sql = 'CREATE TABLE BASE_ORDER(id serial, orderid BIGINT not null, userid integer not null,itemid integer\
            not null,itemname varchar(50) not null,unit_price integer not null,\
             quantity BIGINT not null,amountordered BIGINT not null, discount integer,\
            status varchar(50) not null, BillTo varchar(100),dateordered timestamp not null);'
        Helper.executeQuery(sql)
        .then(() => resolve())
        .catch((err) => reject(err))

    })
}
/**
 * a module used for sending on success message
 * @param {res,result}
 * @return {null}
 */
const successMessage = (res,result) => {
    res.statusCode = 200;
     res.setHeader('content-type', 'application/json');
     return res.json({
            message:`operation successful`,
            orders : result.rows
            
        })
}
/**
 * If NODE_ENV is test after setup of table is done, insert dummy data into the table so
 * that test can be carried out
 */
const insertToTable = () => {
    return new Promise((resolve,reject) => {
        let sql = "\
        INSERT INTO BASE_ORDER(itemname,itemid, unit_price,quantity,amountordered,orderid,status,dateordered,userid) VALUES\
        ('rice',1,100, 5,500,3749, 'PENDING', NOW(), 8),\
        ('beans',1,100, 5,500,3749, 'PENDING', NOW(), 8),\
        ('garri',1,100, 5,500,3749, 'PENDING', NOW(), 8)\
        ";
        Helper.executeQuery(sql)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
    
}
/**
 * a module used for sending on error message
 * @param {res,err}
 * @return {null}
 */
const errorMessage = (res,err) => {
    res.statusCode = 404;
    res.setHeader('content-type', 'application/json');
    return res.json({
            message:`operation failed`,
            err
            
        }) 
}
/**
 * If ENV is TEST, drop table after running test
 */
const dropTable = () => {
    return new Promise((resolve,reject) => {
        let sql = 'DROP TABLE IF EXISTS BASE_ORDER';
        Helper.executeQuery(sql)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
}
