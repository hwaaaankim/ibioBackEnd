import { extname } from 'path';
import { existsSync, mkdir } from 'fs';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';


function randomName(file: any) {
  const fileName = `${uuid()}${extname(file.originalname)}`;
  return fileName;
}


export const MulterImageConfig = {
  storage: diskStorage({
    filters: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new HttpException('Unsupported file type ${extname(file.orginialname)})', HttpStatus.BAD_REQUEST), false);
      }
    },
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = 'uploads/images/';
      if (!existsSync(uploadPath)) {
        mkdir(uploadPath, null);
      } else {
        cb(null, uploadPath);
      }
    },
    filename: (req: any, file: any, cb: any) => {
      const filename = randomName(file);
      cb(null, filename);
    }
  })
};

export const MulterFileConfig = {
  storage: diskStorage({
    filters: (req, file, cb) => {
      if (file.mimetype.match(/\/(doc|docx|pdf|xsl)$/)) {
        cb(null, true);
      } else {
        cb(new HttpException('Unsupported file type ${extname(file.orginialname)})', HttpStatus.BAD_REQUEST), false);
      }
    },
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = 'uploads/files/';
      if (!existsSync(uploadPath)) {
        mkdir(uploadPath, null);
      } else {
        cb(null, uploadPath);
      }
    },
    filename: (req: any, file: any, cb: any) => {
      const filename = randomName(file);
      cb(null, filename);
    }
  })
};