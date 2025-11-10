import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PgUser } from './user.entity';
import { PgOrderItem } from './order-item.entity';
import { OrderStatus } from '../types/common.types';

@Entity('orders')
export class PgOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => PgUser, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: PgUser;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @OneToMany(() => PgOrderItem, orderItem => orderItem.order, { cascade: true })
  orderItems: PgOrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}