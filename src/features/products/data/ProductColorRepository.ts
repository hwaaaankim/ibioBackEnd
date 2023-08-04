import { AppDataSource } from "src/database/config/TypeOrmConfig";
import { ProductColor } from "../domain/ProductColor";
import { ProductColorEntity } from "./models/ProductColorEntity";
import { SystemErrorException } from "src/util/exception/SystemErrorException";
import { DataNotFoundException } from "src/util/exception/DataNotFoundException";


export class ProductColorRepository implements ProductColor {


    async add(productId: string, dto: string) {
        const colors = JSON.parse(dto)
        for (const color of colors) {
            try {

                await AppDataSource.getRepository(ProductColorEntity).create({
                    productId: productId,
                    color: color
                }).save()

            } catch (e) {
                throw new SystemErrorException()
            }
        }
    }

    async update(id: string, color: string) {
        const found: ProductColorEntity = await AppDataSource.getRepository(ProductColorEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('color not found')
        try {
            
            found.color = color
            await found.save()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async delete(id: string) {
        const found: ProductColorEntity = await AppDataSource.getRepository(ProductColorEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('color not found')
        try {
            await found.softRemove()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async findAll() {
        const sizes = await AppDataSource.getRepository(ProductColorEntity).find()
        if (!sizes) throw new DataNotFoundException('No colors saved for product')
    }

    async find(id: string) {
        const found: ProductColorEntity = await AppDataSource.getRepository(ProductColorEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('color not found')
        return found
    }

}