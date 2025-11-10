import { CartRepository } from '../repositories/cart.repository';
import { AddToCartDto, UpdateCartDto } from '../dtos/cart.dto';
import { Cart } from '../entities/cart.entity';

export class CartService {
  constructor(private cartRepository: CartRepository) { }

  async addToCart(addToCartDto: AddToCartDto): Promise<Cart> {
    const existingCartItem = await this.cartRepository.findByUserAndProduct(
      addToCartDto.userId,
      addToCartDto.productId
    );

    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + addToCartDto.quantity;
      return await this.cartRepository.update(existingCartItem.id, {
        quantity: updatedQuantity,
        price: addToCartDto.price
      }) as Cart;
    }

    return await this.cartRepository.create(addToCartDto);
  }

  async getUserCart(userId: number): Promise<Cart[]> {
    return await this.cartRepository.findByUserId(userId);
  }

  async updateCartItem(cartId: number, updateCartDto: UpdateCartDto): Promise<Cart | null> {
    return await this.cartRepository.update(cartId, updateCartDto);
  }

  async removeFromCart(userId: number, productId: number): Promise<void> {
    await this.cartRepository.removeByUserAndProduct(userId, productId);
  }

  async clearCart(userId: number): Promise<void> {
    await this.cartRepository.clearUserCart(userId);
  }

  async getCartItem(cartId: number): Promise<Cart | null> {
    return await this.cartRepository.findById(cartId);
  }
}