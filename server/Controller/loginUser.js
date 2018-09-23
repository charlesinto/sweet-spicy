import Helper from '../Helpers';
import bcrypt from 'bcrypt';

export const loginUser = (req,res) => {
    if(process.env.NODE_ENV === 'TEST'){
        setUpdatabase() 
        .then(() => logUserIn(req,res,'TEST'))
        .catch((err) => {Helper.displayMessage(res,406,err)});
    }else{
        logUserIn(req,res)
    }
}
const logUserIn = (req,res,env) => {
    let request = Helper.trimWhiteSpace(req.body); 
    if(!Helper.validateKey(request, ['email','password'])){
        return Helper.displayMessage(res,400,'Bad Request,one or more keys is missing')
    }
    if(Helper.validateInput(res,request)){
        let sql = 'SELECT * FROM BASE_USER WHERE email = $1';
        Helper.executeQuery(sql,[request.email])
        .then((result)=>{
            if(result.rowCount > 0){
                if(bcrypt.compareSync(request.password,result.rows[0].password)){
                    Helper.assignToken({id:result.rows[0].userid,firstname:result.rows[0].firstname,lastname:result.rows[0].lastname,roleid:result.rows[0].roleid,email:result.rows[0].email})
                    .then((token)=>{
                        if(env === 'TEST'){
                            dropTable()
                            .then(() => outputMessage(res,result,token))
                            .catch((err) =>  {Helper.displayMessage(res,404,'error occurred droppiing database');})
                        }else{
                            outputMessage(res,result,token)
                        }  
                    })
                    .catch((err)=>{
                        Helper.displayMessage(res,403,'couldnt perform authentication',err)
                        
                    })
                }else{
                    Helper.displayMessage(res,404,'Wrong email or password')
                }
            }else{
                Helper.displayMessage(res,404,'Wrong email or password')
            }
        })
        .catch((err)=>{
            Helper.displayMessage(res,503,'Server error or service unavailabe',err)
        });
    }
}
const setUpdatabase = () => {
    return new Promise((resolve,reject) => {
        let sql = 'CREATE TABLE IF NOT EXISTS BASE_USER( userid serial, firstname varchar(50),lastname varchar(50),email varchar(250),password varchar(300), phonenumber varchar(25),roleid integer,rolename varchar(100),datecreated timestamp);'
        Helper.executeQuery(sql)
        .then((result)=> {
            let sql = "\
            INSERT INTO BASE_USER(firstname,lastname,email,password,phonenumber,\
                roleid,rolename,datecreated) values (\
                    'charles','onuorah','charls.onuorah12@yahoo.com','$2b$10$S/qYFt5lG7Z9K.WKA5geXe49qiGsuPIETcfYqV1zjLV7DY58ePTiC'\
                    ,'08163113450',1,'SUPER ADMINISTRATOR','NOW()'\
                )"
            
            Helper.executeQuery(sql)
            .then(() => resolve())
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
    
}

const dropTable = () => {
    return new Promise((resolve,reject) => {
        let sql = 'DROP TABLE IF EXISTS BASE_USER CASCADE;'
        Helper.executeQuery(sql)
        .then(()=> {resolve()})
        .catch((err) => {reject(err)})
    })
    
}
const outputMessage = (res,result,token) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    return res.json({
        message:`welcome ${result.rows[0].email}`,
        token,
        roleid: `${result.rows[0].roleid}`,
        rolename: `${result.rows[0].rolename}`,
        user:`${result.rows[0].firstname} ${result.rows[0].lastname}`
    }) 
}