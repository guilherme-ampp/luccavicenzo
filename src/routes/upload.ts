import {Router} from 'express';
import multer from 'multer';
import path from 'path';
import uploadConfig from '../config/upload';

const uploadRouter = Router();
const upload = multer(uploadConfig);

uploadRouter.get('/video', (request, response) => {
    return response.json({message: 'Video upload endpoint is ready!'});
});

uploadRouter.post(
    '/video',
    upload.single('file'),
    async (request, response) => {
      const { destination, filename } = request.file;
      const videoFilename = path.join(destination, filename);
  
      return response.json({ videoFilename });
    },
  );

export default uploadRouter;
