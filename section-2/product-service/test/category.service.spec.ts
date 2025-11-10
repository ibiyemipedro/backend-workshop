import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoryService } from '../src/services/category.service';
import { CategoryRepository } from '../src/repositories/category.repository';
import { CreateCategoryDto } from '../src/dtos/create-category.dto';
import { UpdateCategoryDto } from '../src/dtos/update-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: CategoryRepository;

  const mockCategory = {
    id: 1,
    name: 'Electronics',
    description: 'Electronic products',
    parentCategoryId: null,
    tags: ['tech', 'gadgets'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCategoryRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Electronics',
        description: 'Electronic products',
        tags: ['tech', 'gadgets'],
      };

      mockCategoryRepository.create.mockResolvedValue(mockCategory);

      const result = await service.create(createCategoryDto);

      expect(repository.create).toHaveBeenCalledWith(createCategoryDto);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('findById', () => {
    it('should return a category when found', async () => {
      mockCategoryRepository.findById.mockResolvedValue(mockCategory);

      const result = await service.findById(1);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException when category not found', async () => {
      mockCategoryRepository.findById.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });
});