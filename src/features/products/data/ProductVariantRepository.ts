import { AppDataSource } from "src/database/config/TypeOrmConfig";
import { ProductVariantEntity } from "./models/ProductVariantValueEntity";
import { SystemErrorException } from "src/util/exception/SystemErrorException";
import { DataNotFoundException } from "src/util/exception/DataNotFoundException";
import { ProductVariantDto } from "./dtos/ProductVariantDto";
import { ProductVariant } from "../domain/ProductVariant";


export class ProductVariantRepository implements ProductVariant {

    async add(productDetailId: string, dto: ProductVariantDto) {
            dto.productDetailId = productDetailId
            try {
                await AppDataSource.getRepository(ProductVariantEntity).create(dto).save()
            } catch (e) {
                throw new SystemErrorException()
            }
    }

    async update(id: string, dto: ProductVariantDto) {
        const found: ProductVariantEntity = await AppDataSource.getRepository(ProductVariantEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('variant not found')
        try {
            if(dto.productColorId) found.productColorId = dto.productColorId
            if(dto.colorPrice) found.colorPrice = dto.colorPrice
            if(dto.productSizeId) found.productSizeId = dto.productSizeId
            if(dto.sizePrice) found.sizePrice = dto.sizePrice
            await found.save()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async delete(id: string) {
        const found: ProductVariantEntity = await AppDataSource.getRepository(ProductVariantEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('variant not found')
        try {
            await found.softRemove()
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    async findAll() {
        const variants = await AppDataSource.getRepository(ProductVariantEntity).find()
        if (!variants) throw new DataNotFoundException('No variants saved for product')
    }

    async find(id: string) {
        const found: ProductVariantEntity = await AppDataSource.getRepository(ProductVariantEntity).findOne({ where: { id: id } })
        if (!found) throw new DataNotFoundException('variant not found')
        return found
    }

}