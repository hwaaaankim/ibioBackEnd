import { AppDataSource } from "src/database/config/TypeOrmConfig";
import { ProductColor } from "../domain/ProductColor";
import { ProductColorEntity } from "./models/ProductColorEntity";
import { SystemErrorException } from "src/util/exception/SystemErrorException";
import { DataNotFoundException } from "src/util/exception/DataNotFoundException";
import { ProductMediaEntity } from "./models/ProductMediaEntity";


export class ProductMediaRepository implements ProductColor {

    entity = ProductMediaEntity


    async add(productId: string, images: any) {
        for (const image of images) {
            try {

                await AppDataSource.getRepository(this.entity).create({
                    productId: productId,
                    title: image.name,
                    type: 'image' //TO-DO CHANGE THIS TO THE REAL FILE TYPE
                }).save()

            } catch (e) {
                throw new SystemErrorException()
            }
        }
    }

    async update(id: string, image: any) {
        const found: ProductMediaEntity = await AppDataSource.getRepository(this.entity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('image not found')
        try {
            found.title = image.title
            image.type = 'image' //TO-DO CHANGE THIS TO THE REAL FILE TYP
            await found.save()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async delete(id: string) {
        const found: ProductMediaEntity = await AppDataSource.getRepository(this.entity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('image not found')
        try {
            await found.softRemove()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async findAll() {
        const sizes = await AppDataSource.getRepository(this.entity).find()
        if (!sizes) throw new DataNotFoundException('No images saved for product')
    }

    async find(id: string) {
        const found: ProductMediaEntity = await AppDataSource.getRepository(this.entity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('image not found')
        return found
    }

}