import Helper from '../Helpers';

export const getUserOrders = (req,res) => {
    if(req.token){
        if(/^\d+$/.test(req.params.id)){
            if( process.env.NODE_ENV === 'TEST'){
                setUpTable()
                .then(() => {
                    insertToTable()
                    .then(() => {
                        getUserOrder(req,res,'TEST')
                    })
                    .catch((err) => {
                        errorMessage(res,err)
                    })
                })
                .catch((err) => {
                    res.statusCode = 503;
                    res.setHeader('content-type', 'application/json');
                    res.json({
                        message: 'error creating table',
                        err
                    }) 
                })
            }else{
                getUserOrder(req,res)
            }
            
        }else{
            res.statusCode = 404;
            res.setHeader('content-type', 'application/json');
            res.json({
                message: 'Not found'
            }) 
        }
    }else{
        res.statusCode = 406;
        res.setHeader('content-type', 'application/json');
        res.json({
            message: 'No authorization'
        })
    }
}

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

const getUserOrder = (req,res,env) => {
    const userid = parseInt(req.params.id);
    let sql = 'SELECT * FROM BASE_ORDER WHERE userid = $1';
    Helper.executeQuery(sql, [userid])
    .then((result) => {
        if(env === 'TEST'){
            dropTable()
            .then(() => successMessage(res,result))
            .catch((err) => errorMessage(res,err))
        }else{
           return successMessage(res,result)
        }
        
    })
}
const successMessage = (res,result) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    return res.json({
        message: 'operation successful',
        orders: result.rows
    }) 
}
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
const errorMessage = (res,err) => {
    res.statusCode = 503;
    res.setHeader('content-type', 'application/json');
    return res.json({
        message: 'operation failed',
        err
    }) 
}
const dropTable = () => {
    return new Promise((resolve,reject) => {
        let sql = 'DROP TABLE IF EXISTS BASE_ORDER';
        Helper.executeQuery(sql)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
}