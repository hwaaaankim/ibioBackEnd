import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { ProductDetail } from "../domain/ProductDetail";
import { ProductDetailDto } from "./dtos/ProductDetailDto";
import { ProductDetailEntity } from "./models/ProductDetailEntity";
import { AuthenticatedUser } from "src/features/user/domain/AuthenticatedUser";
import { AppDataSource } from "src/database/config/TypeOrmConfig";
import { DuplicateResouceFound } from "src/util/exception/DuplicateResourceFound";
import { SystemErrorException } from "src/util/exception/SystemErrorException";
import { DataNotFoundException } from "src/util/exception/DataNotFoundException";
import { ProductColorEntity } from "./models/ProductColorEntity";
import { ProductImageEntity } from "./models/ProductImageEntity";
import * as fs from 'fs';
import { join } from 'path';
import { ProductSizeEntity } from "./models/ProductSizeEntity";

export class ProductDetailRepository implements ProductDetail {

    entity: EntityClassOrSchema = ProductDetailEntity;
    user = AuthenticatedUser.getInstance();

    private repository = AppDataSource.getRepository(this.entity);

    async addProductDetail(id: string, productDetailDto: ProductDetailDto): Promise<any> {
        await this.productExists(id)
        try {
            productDetailDto.productId = id
            const productDetail = await this.repository.create(productDetailDto).save()
            // add sizes
            if (productDetailDto.sizes) {
                const sizes = JSON.parse(productDetailDto.sizes)
                sizes.forEach( async (size) => {
                    await ProductSizeEntity.create({
                        productDetailId: id,
                        quantity: size.quantity,
                        size: size.size
                    }).save()
                })
            }
            // add colors
            if (productDetailDto.colors) {
                const colors = JSON.parse(productDetailDto.colors);
                colors.forEach(async (color) => {
                    await AppDataSource.getRepository(ProductColorEntity)
                        .create({
                            productDetailId: productDetail.id,
                            color: color,
                        })
                        .save();
                });
            }
            // add images
            if (productDetailDto.images) {
                productDetailDto.images.forEach(async (image) => {
                    await AppDataSource.getRepository(ProductImageEntity)
                        .create({
                            productId: productDetail.id,
                            image: image,
                        })
                        .save();
                });
            }
            return this.repository.findOne({
                where: { id: productDetail.id },
                relations: ['colors', 'images'],
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
        const productDetail = await ProductDetailEntity.findOne({ where: { productId: id }, relations: { colors: true, images: true } })
        if (!productDetail) throw new DataNotFoundException('No product detail found')
        if (productDetailDto.colors) {
            // remove old colors
            await ProductColorEntity.remove(productDetail.colors)
            const colors = JSON.parse(productDetailDto.colors);
            colors.forEach(async (color) => {
                await AppDataSource.getRepository(ProductColorEntity)
                    .create({
                        productDetailId: productDetail.id,
                        color: color,
                    })
                    .save();
            });
        }
        // add images
        if (productDetailDto.images) {
            // remove old images
            await ProductImageEntity.remove(productDetail.images)
            // remove the files from hard disk
            productDetail.images.forEach((image) => {
                fs.unlink(
                    join(process.cwd() + '/uploads/images/' + image.image),
                    (err) => {
                        if (err) {
                            console.error(err);
                            //  return err;
                        }
                    },
                );
            });
            productDetailDto.images.forEach(async (image) => {
                await AppDataSource.getRepository(ProductImageEntity)
                    .create({
                        productId: productDetail.id,
                        image: image,
                    })
                    .save();
            });
        }
        productDetail.regularPrice = productDetailDto.regularPrice;
        productDetail.condition = productDetailDto.condition;
        productDetail.quantity = productDetailDto.quantity;
        productDetail.model = productDetail.model
        productDetail.features = productDetail.features
        try {
            await productDetail.save()

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
        const product = await ProductDetailEntity.findOne({ where: { id: id } })
        if (!product) throw new DataNotFoundException('product with that id not found')
        return product
    }



}