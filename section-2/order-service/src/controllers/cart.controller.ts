import { Request, Response } from 'express';
import { CartService } from '../services/cart.service';
import { addToCartSchema, updateCartSchema } from '../dtos/cart.dto';
import { responseUtils } from '../utils/response.utils';

export class CartController {
  constructor(private cartService: CartService) { }

  addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json(responseUtils.error('User not authenticated'));
        return;
      }

      const cartData = { ...req.body, userId };
      const { error } = addToCartSchema.validate(cartData);
      if (error) {
        res.status(400).json(responseUtils.error(error.details[0].message));
        return;
      }

      const cartItem = await this.cartService.addToCart(cartData);
      res.status(201).json(responseUtils.success(cartItem, 'Item added to cart successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to add item to cart'));
    }
  };

  getCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json(responseUtils.error('User not authenticated'));
        return;
      }

      const cart = await this.cartService.getUserCart(userId);
      res.json(responseUtils.success(cart, 'Cart retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to retrieve cart'));
    }
  };

  updateCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const cartId = parseInt(req.params.id);
      const { error } = updateCartSchema.validate(req.body);
      if (error) {
        res.status(400).json(responseUtils.error(error.details[0].message));
        return;
      }

      const cartItem = await this.cartService.updateCartItem(cartId, req.body);

      if (!cartItem) {
        res.status(404).json(responseUtils.error('Cart item not found'));
        return;
      }

      res.json(responseUtils.success(cartItem, 'Cart item updated successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to update cart item'));
    }
  };

  removeFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const productId = parseInt(req.params.productId);

      if (!userId) {
        res.status(401).json(responseUtils.error('User not authenticated'));
        return;
      }

      await this.cartService.removeFromCart(userId, productId);
      res.json(responseUtils.success(null, 'Item removed from cart successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to remove item from cart'));
    }
  };

  clearCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json(responseUtils.error('User not authenticated'));
        return;
      }

      await this.cartService.clearCart(userId);
      res.json(responseUtils.success(null, 'Cart cleared successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to clear cart'));
    }
  };
}