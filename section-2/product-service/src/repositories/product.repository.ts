import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.repository.create(createProductDto);
    return await this.repository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find({ relations: ['category'] });
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    return await this.repository.find({
      where: { categoryId },
      relations: ['category']
    });
  }

  async findById(id: number): Promise<Product> {
    return await this.repository.findOne({
      where: { id },
      relations: ['category']
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.repository.update(id, updateProductDto);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}