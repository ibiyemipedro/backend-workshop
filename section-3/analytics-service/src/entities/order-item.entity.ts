import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PgOrder } from './order.entity';
import { PgProduct } from './product.entity';
import { OrderStatus } from '../types/common.types';

@Entity('order_items')
export class PgOrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => PgOrder, order => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: PgOrder;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => PgProduct, product => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  product: PgProduct;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}