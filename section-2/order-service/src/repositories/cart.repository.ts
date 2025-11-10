import { DataSource, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

export class CartRepository {
  private repository: Repository<Cart>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Cart);
  }

  async create(cartData: Partial<Cart>): Promise<Cart> {
    const cartItem = this.repository.create(cartData);
    return await this.repository.save(cartItem);
  }

  async findByUserId(userId: number): Promise<Cart[]> {
    return await this.repository.find({
      where: { userId },
      order: { createdAt: 'ASC' }
    });
  }

  async findByUserAndProduct(userId: number, productId: number): Promise<Cart | null> {
    return await this.repository.findOne({
      where: { userId, productId }
    });
  }

  async update(id: number, cartData: Partial<Cart>): Promise<Cart | null> {
    await this.repository.update(id, cartData);
    return await this.repository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async removeByUserAndProduct(userId: number, productId: number): Promise<void> {
    await this.repository.delete({ userId, productId });
  }

  async clearUserCart(userId: number): Promise<void> {
    await this.repository.delete({ userId });
  }

  async findById(id: number): Promise<Cart | null> {
    return await this.repository.findOne({ where: { id } });
  }
}