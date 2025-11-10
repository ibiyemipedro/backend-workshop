import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create(createProductDto);
    await this.clearCategoryCache(createProductDto.categoryId);
    return product;
  }

  async findAll(): Promise<Product[]> {
    const cacheKey = 'products:all';
    const cached = await this.cacheManager.get<Product[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const products = await this.productRepository.findAll();
    await this.cacheManager.set(cacheKey, products, 300000);
    return products;
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    const cacheKey = `products:category:${categoryId}`;
    const cached = await this.cacheManager.get<Product[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const products = await this.productRepository.findByCategory(categoryId);
    await this.cacheManager.set(cacheKey, products, 300000);
    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.findById(id);
    const updatedProduct = await this.productRepository.update(id, updateProductDto);

    await this.clearCategoryCache(existingProduct.categoryId);
    if (updateProductDto.categoryId && updateProductDto.categoryId !== existingProduct.categoryId) {
      await this.clearCategoryCache(updateProductDto.categoryId);
    }

    return updatedProduct;
  }

  async delete(id: number): Promise<void> {
    const product = await this.findById(id);
    await this.productRepository.delete(id);
    await this.clearCategoryCache(product.categoryId);
  }

  private async clearCategoryCache(categoryId: number): Promise<void> {
    await this.cacheManager.del(`products:category:${categoryId}`);
    await this.cacheManager.del('products:all');
  }
}