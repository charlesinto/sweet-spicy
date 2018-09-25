import Helper from '../Helpers';
import order from '../Orders';
import Helpers from '../Helpers';

export const createNewOrder = (req, res) => {
    if(req.token){
        if(process.env.NODE_ENV === 'TEST'){
            setUpTable()
            .then(() => postOrder(req,res,'TEST'))
            .catch((err) => {
                res.statusCode = 503;
                res.setHeader('content-type', 'application/json');
                res.json({
                    message:`error setting up table`,
                    err
                })
            })
        }else{
            postOrder(req,res)
        }
    }else{
        res.statusCode = 406;
        res.setHeader('content-type', 'application/json');
        res.json({
            message:`No token found`
            
        })
    }
    
}

const setUpTable = () => {
    return new Promise((resolve,reject) => {
        let sql = 'CREATE TABLE IF NOT EXISTS BASE_ORDER(id serial, orderid BIGINT not null, userid integer not null,itemid integer\
            not null,itemname varchar(50) not null,unit_price integer not null,\
             quantity BIGINT not null,amountordered BIGINT not null, discount integer,\
            status varchar(50) not null, BillTo varchar(100),dateordered timestamp not null);'
        Helper.executeQuery(sql)
        .then(() => resolve())
        .catch((err) => reject(err))

    })
    
    
}
const dropTable = () => {
    return new Promise((resolve,reject) => {
        let sql = 'DROP TABLE IF EXISTS BASE_ORDER;'
        Helper.executeQuery(sql)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
}
const postOrder = (req,res,env) => {
    let params = '';
    if(!Helpers.validateKey(req.body,['items'])){
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        return res.json({message:'Bad Request,one or more keys is missing'});
    }
    if(typeof req.body.items == 'object' && typeof req.body.items.length !== "undefined"){
        let request = []
        let orderid = 3000 + new Date().getUTCMilliseconds()
        for(let i = 0; i< req.body.items.length; i++){
            let item = Helper.trimWhiteSpace(req.body.items[i]);
            if(!Helpers.validateKey(item,["itemname", "quantity", "unit_price","itemid", "amountordered"])){
                res.statusCode = 403;
                res.setHeader('content-type', 'application/json');
                return res.json({message:'Bad Request,one or more keys is missing'});
            }
            
            else if(Helper.validateInput(res, Helper.trimWhiteSpace(req.body.items[i]))) {
                let pickupLocation = req.body.items[i].billto;
                    params = `('${req.body.items[i].itemname}',${req.body.items[i].itemid},${req.body.items[i].unit_price}, ${req.body.items[i].quantity},${req.body.items[i].amountordered},${orderid}, 'PENDING', NOW(), ${req.token.userid})`;
                    request.push(params);
            }else{
                res.statusCode = 401;
                res.setHeader('content-type', 'application/json');
                res.json({
                    message:`operation failed`,
                    order:[]
                    
                })
            }
        }
        let orderDetails = request.join();
        let sql = `INSERT INTO BASE_ORDER(itemname,itemid, unit_price,quantity,amountordered,orderid,status,dateordered,userid) VALUES ${orderDetails}`;
        Helper.executeQuery(sql)
        .then((result) => {
            let sql = 'SELECT * FROM BASE_ORDER WHERE orderid = $1'
            Helper.executeQuery(sql, [orderid])
            .then((result) => {
                if(env === 'TEST'){
                    dropTable()
                    .then(() => {
                        successMessage(res,result)
                    })
                    .catch((err) => {
                        res.statusCode = 503;
                        res.setHeader('content-type', 'application/json');
                        res.json({
                            message:`error dropping table`,
                            err
                        })
                    })
                }else{
                    successMessage(res,result)
                }
                
            })
            .catch((err) => {
                res.statusCode = 503;
                res.setHeader('content-type', 'application/json');
                res.json({
                    message:`operation failed`,
                    err
                    
                })
            })
            
        })
        .catch((err) => {
            res.statusCode = 503;
            res.setHeader('content-type', 'application/json');
            res.json({
                message:`operation failed`,
                err
                
            })
        }) 
    }
}

const successMessage = (res, result) => {
    res.statusCode = 201;
    res.setHeader('content-type', 'application/json');
    return res.json({
        message:`operation successful`,
        items: result.rows
    })
}
