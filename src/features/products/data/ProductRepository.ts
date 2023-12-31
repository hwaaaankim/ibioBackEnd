import { SystemErrorException } from './../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from './../../../util/exception/DuplicateResourceFound';
import { ProductEntity } from './models/ProductEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Product } from './../domain/Product';
import { ProductDto } from './dtos/ProductDto';
import { Like, getRepository } from 'typeorm';
import { DataNotFoundException } from 'src/util/exception/DataNotFoundException';
import { CategoryDto } from './dtos/CategoryDto';
import { CategoryEntity } from './models/CategoryEntity';
import { ColorEntity } from './models/ColorEntity';
import { ProductImageEntity } from './models/ProductImageEntity';

import * as fs from 'fs';
import { join } from 'path';

export class ProductRepository implements Product {

    async addCategory(categoryDto: CategoryDto): Promise<any> {
        const category = {
            name: categoryDto.category
        }
        try {
            await getRepository(CategoryEntity).create(category).save()
            return true
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new DuplicateResouceFound('Category already exists');
            }
            throw new SystemErrorException()
        }
    }
    async updateCategory(id: string, categoryDto: CategoryDto): Promise<boolean> {

        const category: CategoryEntity = await getRepository(CategoryEntity).findOne(id)
        if (!category)
            throw new DataNotFoundException('')
        try {
            category.name = categoryDto.category
            category.save()
            return true
        } catch (e) {

        }

    }
    async deleteCategory(id: string): Promise<any> {
        console.log('hey man')
        const category: CategoryEntity = await getRepository(CategoryEntity).findOne(id)
        try {
            console.log(category)
            category.softRemove()
        } catch (e) {
            console.log(e)
            throw new SystemErrorException()
        }
    }
    async getCategories(): Promise<any> {
        return await getRepository(CategoryEntity).find()
    }

    async getProductDetails(id: string): Promise<any> {
        const product = await getRepository(this.entity).findOne(id, { relations: ['colors', 'images'] })
        return product
    }

    entity: EntityClassOrSchema = ProductEntity

    async addProduct(product: ProductDto): Promise<boolean> {
        try {
            const created = await getRepository(this.entity).create(product).save()
            // add colors
            console.log(typeof(product.colors))
            if (product.colors) {
                const colors = JSON.parse(product.colors)
                colors.forEach(async color => {
                    await getRepository(ColorEntity).create({
                        productId: created.id,
                        color: color
                    }).save()
                })
            }
            // add images
            if ( product.images ) {
                product.images.forEach(async image => {
                    await getRepository(ProductImageEntity).create({
                        productId: created.id,
                        image: image
                    }).save()
                })
            }
            return getRepository(this.entity).findOne(created.id, { relations: ['colors', 'images']})
        } catch (error) {
            console.log(error)
            if (error.code === 'ER_DUP_ENTRY') {
                throw new DuplicateResouceFound('Product already exists');
            }
            throw new SystemErrorException()
        }
    }

    async updateProduct(id: string, productDto: ProductDto): Promise<any> {

        const product: ProductEntity = await ProductEntity.findOne(id)
        if(!product) throw new DataNotFoundException('product not found')

        try {
            product.name = productDto.name
            product.price = productDto.price
            product.condition = productDto.condition
            product.stock = productDto.stock
            if (productDto.size) product.size = productDto.size
            if (product.colors) {
                const colors = JSON.parse(productDto.colors)
                colors.forEach(async color => {
                    await getRepository(ColorEntity).create({
                        productId: product.id,
                        color: color
                    }).save()
                })
            }
            // add images
            if ( productDto.images ) {
                productDto.images.forEach(async image => {
                    await getRepository(ProductImageEntity).create({
                        productId: product.id,
                        image: image
                    }).save()
                })
            }
            if (productDto.motor_type) product.motor_type = productDto.motor_type
            if (productDto.year) product.year = productDto.year
            if (productDto.transmission) product.transmission = productDto.transmission
            if (productDto.fuel) product.fuel = productDto.fuel
            const updated = await product.save()
            return getRepository(this.entity).findOne(updated.id, { relations: ['colors', 'images']})
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new DuplicateResouceFound('Product already exists');
            }
            throw new SystemErrorException()
        }
    }
    async filterProducts(category: string, page?: number, limit?: number): Promise<any> {
        category = category.toLowerCase()
        const currentPage = page * 1 || 10;
        const take = limit * 1;
        const skip = (currentPage - 1) * limit || 0;
        const allProducts = await getRepository(this.entity).find({ where: { category: category } })
        const products = await getRepository(this.entity).find({
            skip: skip,
            take: take,
            where: { category: category },
            relations: ['colors', 'images']
        })
        return { allProducts: allProducts.length, products }
    }

    async getProducts(page?: number, limit?: number): Promise<any> {
        const currentPage = page * 1 || 10;
        const take = limit * 1;
        const skip = (currentPage - 1) * limit || 0;
        const allProducts = await getRepository(this.entity).count();
        const products = await getRepository(this.entity).find({
            skip: skip,
            take: take,
            relations: ['colors', 'images'],
        })
        return { allProducts, products }
    }

    async searchProducts(title: string, page?: number, limit?: number): Promise<any> {
        const currentPage = page * 1 || 10;
        const take = limit * 1;
        const skip = (currentPage - 1) * limit || 0;
        // const allProducts = await getRepository(this.entity).count();
        const products = await getRepository(this.entity).find({
            skip: skip,
            take: take,
            where: { name: Like(`%${title}%`) },
            relations: ['colors', 'images']
        })
        return { allProducts: products.length, products }
    }

    async deleteProduct(id: string): Promise<boolean> {
        // get the product first
        const product: ProductEntity = await getRepository(this.entity).findOne(id, { relations: ['images']})
        try {
            try {
                await getRepository(ColorEntity).delete({ productId: id })
                await getRepository(ProductImageEntity).delete({ productId: id })
                product.images.forEach(image => {
                    fs.unlink(join(process.cwd() + '/uploads/images/' + image.image), (err) => {
                        if (err) {
                         console.error(err);
                        //  return err;
                        }
                    });
                })
            }catch(e) {
                console.log('no colors or images found I guess')
            }
            product.remove()
            return true
        } catch (error) {
            throw new SystemErrorException()
        }
    }

    async filterProductsByPrice(name: string, page?: number, limit?: number): Promise<any> {
        const currentPage = page * 1 || 10;
        const take = limit * 1;
        const skip = (currentPage - 1) * limit || 0;
        const allProducts = await getRepository(this.entity).count();
        const order = name === 'Price: Low to High' ? 'ASC' : 'DESC'
        const products = await getRepository(this.entity).find({
            skip: skip,
            take: take,
            order: { price: order },
            relations: ['colors', 'images']
        })
        return { allProducts, products }
    }
}