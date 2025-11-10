import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Category created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Categories retrieved successfully' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Category retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  async findById(@Param('id') id: string) {
    return await this.categoryService.findById(Number(id));
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Category updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(Number(id), updateCategoryDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Category deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  async delete(@Param('id') id: string) {
    await this.categoryService.delete(Number(id));
    return { message: 'Category deleted successfully' };
  }
}