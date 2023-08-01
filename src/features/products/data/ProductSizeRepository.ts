import { AppDataSource } from "src/database/config/TypeOrmConfig";
import { ProductSize } from "../domain/ProductSize";
import { ProductSizeEntity } from "./models/ProductSizeEntity";
import { SystemErrorException } from "src/util/exception/SystemErrorException";
import { DataNotFoundException } from "src/util/exception/DataNotFoundException";
import { getRepositoryToken } from "@nestjs/typeorm";


export class ProductSizeRepository implements ProductSize {


    async add(productId: string, dto: string) {
        const sizes = JSON.parse(dto)
        for (const size of sizes) {
            try {

                await AppDataSource.getRepository(ProductSizeEntity).create({
                    productId: productId,
                    value: Number.parseInt(size)
                }).save()

            } catch (e) {
                throw new SystemErrorException()
            }
        }
    }

    async update(id: string, size: number) {
        const found: ProductSizeEntity = await AppDataSource.getRepository(ProductSizeEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('size not found')
        try {
            found.value = size
            await found.save()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async delete(id: string) {
        const found: ProductSizeEntity = await AppDataSource.getRepository(ProductSizeEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('size not found')
        try {
            await found.softRemove()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async findAll() {
        const sizes = await AppDataSource.getRepository(ProductSizeEntity).find()
        if (!sizes) throw new DataNotFoundException('No sizes saved for product')
    }

    async find(id: string) {
        const found: ProductSizeEntity = await AppDataSource.getRepository(ProductSizeEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('size not found')
        return found
    }

}