import { diskStorage } from 'multer';
import path from 'path';

const generateId = () => Date.now()

const normalizeFileName = (req, file, callback) => {
    const fileExtName = file.originalname.split('.').pop();
    callback(null, `${generateId()}.${fileExtName}`);
};

export const fileStorage = diskStorage({
    destination: './uploads',
    filename: normalizeFileName,
});