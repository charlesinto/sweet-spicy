import path from 'path';
import multer from 'multer';
import Helper from '../Helpers'
import { ADMIN_USER } from '../Controller'
let UPLOADED_FILE_NAME = '';
/**
 * Uploads image file to /asset folder and to databse
 *
 */

export const addToMenu = (req,res) => {
    if(req.token.roleid === ADMIN_USER){
        uploadHandler(req,res, (err,filename) => {
            if(err){
               Helper.displayMessage(res,503,'error occurred',err)
            }else{
                uploadToDatabase(req,res);
            }
        })
    }
    
}

/**
 * inserts new uploaded image to database
 *
 * 
 */

const uploadToDatabase = (req,res) => {
    let request = Helper.trimWhiteSpace(req.body);
    if(!Helper.validateKey(request,['itemname','unit_price'])){
        return Helper.displayMessage(res,403,'Bad Request,one or more keys is missing');
    }
    if(Helper.validateInput(res,request)){
        let unit_price = parseInt(request.unit_price);
        let sql = `INSERT INTO BASE_MENU(itemname,unit_price,url,datecreated) VALUES ('${request.itemname}',${request.unit_price},'/asset/${UPLOADED_FILE_NAME}',NOW())`;
        Helper.executeQuery(sql)
        .then(() => Helper.displayMessage(res,201,'upload successful'))
        .catch(() => Helper.displayMessage(res,500,'error occurred while uploading file'))
    }
}
/**
 * sets the path of the image to be uploaded.
 *
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.join(__dirname,'..','..','UI','asset'));
      },
    filename: function(req,file,cb){
        UPLOADED_FILE_NAME = `${file.originalname.split('.')[0]}-${Date.now()}${path.extname(file.originalname)}`
        cb(null,`${UPLOADED_FILE_NAME}`)
    }
})
/**
 * A function called by multer to handle file upload
 *
 */
const uploadHandler = multer({
    storage,
    limits:{fileSize:5000000},
    fileFilter: (req,file,cb) => {
        checkFileType(file,cb)
    }
}).single('myImage');
/**
 * validates the file extension and mime to be an image
 */
const checkFileType = (file,cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if(extname && mimeType){
        return cb(null,true, UPLOADED_FILE_NAME)
    }else{
        cb('Images only')
    }
}