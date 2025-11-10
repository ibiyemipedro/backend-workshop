import { CartService } from '../src/services/cart.service';
import { CartRepository } from '../src/repositories/cart.repository';
import { AddToCartDto } from '../src/dtos/cart.dto';

jest.mock('../src/repositories/cart.repository');

describe('CartService', () => {
  let cartService: CartService;
  let mockCartRepository: jest.Mocked<CartRepository>;

  beforeEach(() => {
    mockCartRepository = new CartRepository({} as any) as jest.Mocked<CartRepository>;
    cartService = new CartService(mockCartRepository);
  });

  describe('addToCart', () => {
    it('should add new item to cart', async () => {
      const addToCartDto: AddToCartDto = {
        userId: 1,
        productId: 1,
        price: 10.99,
        quantity: 2
      };

      const mockCartItem = {
        id: 1,
        userId: 1,
        productId: 1,
        price: 10.99,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockCartRepository.findByUserAndProduct.mockResolvedValue(null);
      mockCartRepository.create.mockResolvedValue(mockCartItem as any);

      const result = await cartService.addToCart(addToCartDto);

      expect(mockCartRepository.findByUserAndProduct).toHaveBeenCalledWith(1, 1);
      expect(mockCartRepository.create).toHaveBeenCalledWith(addToCartDto);
      expect(result).toEqual(mockCartItem);
    });

    it('should update existing cart item quantity', async () => {
      const addToCartDto: AddToCartDto = {
        userId: 1,
        productId: 1,
        price: 10.99,
        quantity: 2
      };

      const existingCartItem = {
        id: 1,
        userId: 1,
        productId: 1,
        price: 8.99,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const updatedCartItem = {
        ...existingCartItem,
        price: 10.99,
        quantity: 3
      };

      mockCartRepository.findByUserAndProduct.mockResolvedValue(existingCartItem as any);
      mockCartRepository.update.mockResolvedValue(updatedCartItem as any);

      const result = await cartService.addToCart(addToCartDto);

      expect(mockCartRepository.update).toHaveBeenCalledWith(1, {
        quantity: 3,
        price: 10.99
      });
      expect(result).toEqual(updatedCartItem);
    });
  });

  describe('getUserCart', () => {
    it('should return user cart items', async () => {
      const mockCartItems = [
        { id: 1, userId: 1, productId: 1, price: 10.99, quantity: 2 },
        { id: 2, userId: 1, productId: 2, price: 5.50, quantity: 1 }
      ];

      mockCartRepository.findByUserId.mockResolvedValue(mockCartItems as any);

      const result = await cartService.getUserCart(1);

      expect(mockCartRepository.findByUserId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCartItems);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', async () => {
      mockCartRepository.removeByUserAndProduct.mockResolvedValue();

      await cartService.removeFromCart(1, 1);

      expect(mockCartRepository.removeByUserAndProduct).toHaveBeenCalledWith(1, 1);
    });
  });
});