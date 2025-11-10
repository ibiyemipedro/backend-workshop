import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { ProductService } from '../src/services/product.service';
import { ProductRepository } from '../src/repositories/product.repository';
import { CreateProductDto } from '../src/dtos/create-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;
  let cacheManager: any;

  const mockProduct = {
    id: 1,
    categoryId: 1,
    title: 'iPhone 13',
    description: 'Latest iPhone',
    summary: 'Apple iPhone 13',
    amount: 999.99,
    currency: 'USD',
    images: ['image1.jpg'],
    tags: ['apple', 'phone'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProductRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByCategory: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        categoryId: 1,
        title: 'iPhone 13',
        amount: 999.99,
      };

      mockProductRepository.create.mockResolvedValue(mockProduct);

      const result = await service.create(createProductDto);

      expect(repository.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findById', () => {
    it('should return a product when found', async () => {
      mockProductRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.findById(1);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException when product not found', async () => {
      mockProductRepository.findById.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });
});