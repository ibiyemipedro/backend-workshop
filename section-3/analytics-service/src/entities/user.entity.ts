import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserRole, IAddress, IMobileNumber } from '../types/common.types';
import { PgOrder } from './order.entity';

@Entity('users')
export class PgUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column('json')
  address: IAddress;

  @Column('json')
  mobile: IMobileNumber;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column()
  password: string;

  @Column('json')
  addresses: IAddress[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => PgOrder, order => order.user)
  orders: PgOrder[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}