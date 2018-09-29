import multer from 'multer';
import path from 'path';

let UPLOADED_FILE_NAME = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Hello people in storage");
        return cb(null, path.join(__dirname,'..','..','UI','asset'));
      },
    filename: function(req,file,cb){
        UPLOADED_FILE_NAME = `${file.originalname.split('.')[0]}-${Date.now()}${path.extname(file.originalname)}`
        cb(null,`${UPLOADED_FILE_NAME}`)
    }
})

export const uploadHandler = multer({
    storage,
    limits:{fileSize:5000000},
    fileFilter: (req,file,cb) => {
        console.log(file);
        checkFileType(file,cb)
    }
}).single('myImage')
export const filename = UPLOADED_FILE_NAME ? UPLOADED_FILE_NAME : 'xcs';
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
