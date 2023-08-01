import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { ProductDetail } from "../domain/ProductDetail";
import { ProductDetailDto } from "./dtos/ProductDetailDto";
import { ProductDetailEntity } from "./models/ProductDetailEntity";
import { AuthenticatedUser } from "src/features/user/domain/AuthenticatedUser";
import { AppDataSource } from "src/database/config/TypeOrmConfig";
import { DuplicateResouceFound } from "src/util/exception/DuplicateResourceFound";
import { SystemErrorException } from "src/util/exception/SystemErrorException";
import { DataNotFoundException } from "src/util/exception/DataNotFoundException";
import { ProductEntity } from "./models/ProductEntity";

export class ProductDetailRepository implements ProductDetail {

    entity: EntityClassOrSchema = ProductDetailEntity;
    user = AuthenticatedUser.getInstance();

    private repository = AppDataSource.getRepository(this.entity);

    async addProductDetail(id: string, productDetailDto: ProductDetailDto): Promise<any> {
        await this.productExists(id)
        try {
            productDetailDto.productId = id
            const productDetail = await this.repository.create(productDetailDto).save()
            return this.repository.findOne({
                where: { id: productDetail.id },
                relations: ['colors', 'media'],
            });
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new DuplicateResouceFound('Product already exists');
            }
            // throw general system error
            else {
                throw new SystemErrorException();
            }
        }
    }


    async updateProductDetail(id: string, productDetailDto: ProductDetailDto): Promise<any> {
        await this.productExists(id)
        const productDetail = await ProductDetailEntity.findOne({ where: { productId: id }})
        if (!productDetail) throw new DataNotFoundException('No product detail found')
        try {
            productDetail.basePrice = productDetailDto.basePrice
            await productDetail.save()
            return true
        } catch (e) {
            throw new SystemErrorException()
        }
    }

    getProductDetail(id: string) {
        throw new Error("Method not implemented.");
    }

    async deleteProductDetail(id: string) {
        const productDetail = await this.repository.findOne({ where: { id: id } })
        if (!productDetail) throw new DataNotFoundException('no product detail found')
        try {
            productDetail.softRemove()
        } catch (e) {
            throw new SystemErrorException('no product detail found')
        }

    }

    private async productExists(id: string): Promise<any> {
        const product = await ProductEntity.findOne({ where: { id: id } })
        if (!product) throw new DataNotFoundException('product with that id not found')
        return product
    }



}