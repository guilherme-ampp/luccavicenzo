import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  // for now, let's just use our local storage
  // the destination parameter is simply the path where uploaded files will
  // be stored
  // the second parameter is a function that received (request, file, callback)
  //   request is the request
  //   file is the uploaded file
  //   callback is supposed to be invoked with the modified filename for saving the uploaded content
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const {phonenumber} = request.body;
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${phonenumber}-${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};