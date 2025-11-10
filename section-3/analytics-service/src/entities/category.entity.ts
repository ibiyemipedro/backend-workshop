import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PgOrderItem } from './order-item.entity';

@Entity('categories')
export class PgCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ name: 'parent_category_id', nullable: true })
  parentCategoryId: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @OneToMany(() => PgOrderItem, orderItem => orderItem.product)
  products: PgOrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}