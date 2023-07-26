import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CompressionPipe implements PipeTransform<Express.Multer.File[], Promise<string>> {


    async transform(images: Express.Multer.File[]): Promise<any> {
        if(!images) return
        let uploadedImages = new Array();
        for (const image of images) {
            const filename = uuid() + '.webp';
            await sharp(image.buffer)
                .resize(1000)
                .webp({ effort: 3 })
                .toFile(path.join('uploads/images', filename))
            uploadedImages.push(filename)
        }
        console.log(uploadedImages)
        return uploadedImages

    }

}