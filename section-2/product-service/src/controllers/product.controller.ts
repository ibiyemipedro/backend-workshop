import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Product created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Products retrieved successfully' })
  async findAll(@Query('categoryId') categoryId?: string) {
    if (categoryId) {
      return await this.productService.findByCategory(Number(categoryId));
    }
    return await this.productService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Product retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async findById(@Param('id') id: string) {
    return await this.productService.findById(Number(id));
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Product updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Product deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async delete(@Param('id') id: string) {
    await this.productService.delete(Number(id));
    return { message: 'Product deleted successfully' };
  }
}