import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PgCategory } from './category.entity';
import { PgOrderItem } from './order-item.entity';

@Entity('products')
export class PgProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => PgCategory)
  @JoinColumn({ name: 'category_id' })
  category: PgCategory;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  summary: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('simple-array')
  images: string[];

  @Column('simple-array', { nullable: true })
  tags: string[];

  @OneToMany(() => PgOrderItem, orderItem => orderItem.product)
  orderItems: PgOrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}