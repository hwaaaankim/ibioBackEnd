import { SystemErrorException } from './../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from './../../../util/exception/DuplicateResourceFound';
import { ProductEntity } from './models/ProductEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Product } from './../domain/Product';
import { ProductDto } from './dtos/ProductDto';
import { Like } from 'typeorm';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { CategoryDto } from './dtos/CategoryDto';
import { CategoryEntity } from './models/CategoryEntity';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class ProductRepository implements Product {

  entity: EntityClassOrSchema = ProductEntity;
  private productRepository = AppDataSource.getRepository(this.entity);

  async addCategory(categoryDto: CategoryDto): Promise<any> {
    const category = {
      name: categoryDto.category,
    };
    try {
      await AppDataSource.getRepository(CategoryEntity).create(category).save();
      return true;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Category already exists');
      }
      throw new SystemErrorException();
    }
  }
  async updateCategory(id: string, categoryDto: CategoryDto): Promise<boolean> {
    const category: CategoryEntity = await AppDataSource.getRepository(
      CategoryEntity,
    ).findOne({
      where: { id: id },
    });

    if (!category) throw new DataNotFoundException('');
    try {
      category.name = categoryDto.category;
      category.save();
      return true;
    } catch (e) { }
  }


  async deleteCategory(id: string): Promise<any> {
    console.log('hey man');
    const category: CategoryEntity = await AppDataSource.getRepository(
      CategoryEntity,
    ).findOne({
      where: { id: id },
    });
    try {
      console.log(category);
      category.softRemove();
    } catch (e) {
      console.log(e);
      throw new SystemErrorException();
    }
  }


  async getCategories(): Promise<any> {
    return await AppDataSource.getRepository(CategoryEntity).find();
  }

  async getProduct(id: string): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['productDetails', 'discounts', 'reviews', 'tags', 'productDetails.colors', 'productDetails.images', 'productDetails.sizes'],
    });
    return product;
  }

  async addProduct(product: ProductDto): Promise<boolean> {
    product.code = this.generateProductCode()
    try {
      const created = await this.productRepository.create(product).save();
      return created;
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Product already exists');
      }
      throw new SystemErrorException();
    }
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<any> {
    const product: ProductEntity = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!product) throw new DataNotFoundException('product not found');

    try {
      product.name = productDto.name;
      product.description = productDto.description;
      product.categoryId = productDto.categoryId;
      const updated = await product.save();
      return this.productRepository.findOne({
        where: { id: updated.id },
        relations: ['colors', 'images'],
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Product already exists');
      }
      throw new SystemErrorException();
    }
  }
  async filterProducts(
    category: string,
    page?: number,
    limit?: number,
  ): Promise<any> {
    category = category.toLowerCase();
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    const allProducts = await this.productRepository.find({
      where: { category: category },
    });
    const products = await this.productRepository.find({
      skip: skip,
      take: take,
      where: { category: category },
      relations: ['colors', 'images'],
    });
    return { allProducts: allProducts.length, products };
  }

  async getProducts(page?: number, limit?: number): Promise<any> {
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    const allProducts = await this.productRepository.count();
    const products = await this.productRepository.find({
      skip: skip,
      take: take,
      relations: ['productDetails', 'colors', 'images', 'discounts', 'reviews', 'tags', 'productDetails.colors', 'productDetails.images', 'productDetails.sizes'],
    });
    return { allProducts, products };
  }

  async searchProducts(
    title: string,
    page?: number,
    limit?: number,
  ): Promise<any> {
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    // const allProducts = await getRepository(this.entity).count();
    const products = await this.productRepository.find({
      skip: skip,
      take: take,
      where: { name: Like(`%${title}%`) },
      relations: ['colors', 'images'],
    });
    return { allProducts: products.length, products };
  }

  async deleteProduct(id: string): Promise<boolean> {
    // get the product first
    const product: ProductEntity = await this.productRepository.findOne({
      where: {
        id: id,
      }
    });
    try {
      product.remove()
      return true;
    } catch (error) {
      throw new SystemErrorException();
    }
  }

  async filterProductsByPrice(
    name: string,
    page?: number,
    limit?: number,
  ): Promise<any> {
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    const allProducts = await AppDataSource.getRepository(this.entity).count();
    const order = name === 'Price: Low to High' ? 'ASC' : 'DESC';
    const products = await AppDataSource.getRepository(this.entity).find({
      skip: skip,
      take: take,
      order: { price: order },
      relations: ['colors', 'images'],
    });
    return { allProducts, products };
  }


  private generateProductCode() {
    const code = (Math.floor(Math.random() * 1000000) + 1000000)
      .toString()
      .substring(1);
    return code;
  }
}
