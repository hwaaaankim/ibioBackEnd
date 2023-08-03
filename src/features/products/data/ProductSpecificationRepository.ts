import { AppDataSource } from "src/database/config/TypeOrmConfig";
import { ProductSpecificationEntity } from "./models/ProductSpecificationEntity";
import { SystemErrorException } from "src/util/exception/SystemErrorException";
import { DataNotFoundException } from "src/util/exception/DataNotFoundException";
import { ProductSpecification } from "../domain/ProductSpecification";


export class ProductSpecificationRepository implements ProductSpecification {

    async add(productId: string, dto: any) {
        const specifications = JSON.parse(dto)
        for (const specification of specifications) {
            try {
                await AppDataSource.getRepository(ProductSpecificationEntity).create({
                    productId: productId,
                    name: specification.name,
                    value: specification.value
                }).save()
            } catch (e) {
                throw new SystemErrorException()
            }
        }
    }

    async update(id: string, dto: any) {
        const found: ProductSpecificationEntity = await AppDataSource.getRepository(ProductSpecificationEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('specification not found')
        try {
            found.value = dto.value
            found.name = dto.name
            await found.save()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async delete(id: string) {
        const found: ProductSpecificationEntity = await AppDataSource.getRepository(ProductSpecificationEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('specification not found')
        try {
            await found.softRemove()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async findAll() {
        const specifications = await AppDataSource.getRepository(ProductSpecificationEntity).find()
        if (!specifications) throw new DataNotFoundException('No specifications saved for product')
    }

    async find(id: string) {
        const found: ProductSpecificationEntity = await AppDataSource.getRepository(ProductSpecificationEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('specification not found')
        return found
    }

}