import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { databaseConfig } from './utils/database.config';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { CategoryRepository } from './repositories/category.repository';
import { ProductRepository } from './repositories/product.repository';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Category, Product]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-jwt-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    CacheModule.register({
      ttl: 300,
      max: 1000,
    }),
  ],
  controllers: [CategoryController, ProductController],
  providers: [
    CategoryRepository,
    ProductRepository,
    CategoryService,
    ProductService,
    JwtStrategy,
  ],
})
export class AppModule { }