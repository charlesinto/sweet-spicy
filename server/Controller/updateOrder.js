import Helper from '../Helpers';
import { ADMIN_USER, TEST_ENV, PROCESSING, CANCELLED, COMPLETE } from '../Controller';

export const updateOrder = (req, res) => {
    if(req.token.roleid === ADMIN_USER){
        if(/^\d+$/.test(req.params.id)){
            if(process.env.NODE_ENV === TEST_ENV){
                setUpTable()
                .then(() => {
                    insertToTable()
                    .then(() => updateOrderById(req,res,TEST_ENV))
                    .catch((err) => errorMessage(res,err))
                })
                .catch((err) => errorMessage(res,err))
            }else{
                updateOrderById(req,res);
            }
        }else{
            res.statusCode = 400;
            res.setHeader('content-type', 'application/json');
            res.json({
                message:`Bad request`
            })
        }
    }else{
        res.statusCode = 406;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`Unathourized user`
            
        })
    }
}


const updateOrderById = (req,res,env) => {
    const requestId = parseInt(req.params.id);
    let request = Helper.trimWhiteSpace(req.body)
    if(!Helper.validateKey(request,['status'])){
        return Helper.displayMessage(res,400,'Bad Request,one or more keys is missing')
    }else{
        switch(request.status){
            case PROCESSING:
                runUpdate(res,PROCESSING, requestId,env);
            break;
            case CANCELLED: 
                runUpdate(res,CANCELLED, requestId,env);
            break;
            case COMPLETE:
                runUpdate(res,COMPLETE,requestId,env);
            break;
            default:
                errorMessage(res,'INVALID REQUEST');
        }
    }
}
const runUpdate = (res,status, requestId, env) => {
    let sql = `UPDATE BASE_ORDER SET STATUS = '${status}' WHERE id = ${requestId}`
    Helper.executeQuery(sql)
    .then((result) =>{
        let sql = `SELECT * FROM BASE_ORDER WHERE id = ${requestId}`;
        Helper.executeQuery(sql)
        .then((result) => {
            if(env === TEST_ENV){
                dropTable()
                .then(() => successMessage(res,result))
                .catch((err) => errorMessage(res,err))
            }else{
                successMessage(res,result)
            }
        })
        .catch((err) => errorMessage(res,err))
    })
    .catch((err) => errorMessage(res,err))
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

const successMessage = (res,result) => {
    res.statusCode = 201;
     res.setHeader('content-type', 'application/json');
     return res.json({
            message:`operation successful`,
            order : result.rows[0]
            
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
    res.statusCode = 404;
    res.setHeader('content-type', 'application/json');
    return res.json({
            message:`operation failed`,
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