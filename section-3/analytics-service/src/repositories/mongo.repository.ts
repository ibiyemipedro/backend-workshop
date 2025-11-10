import { MongoUser } from '../models/user.model';
import { MongoOrder } from '../models/order.model';
import { MongoProduct } from '../models/product.model';
import { MongoOrderItem } from '../models/order-item.model';
import { MongoCategory } from '../models/category.model';

export class MongoRepository {
  async getAllUsers(): Promise<any[]> {
    return MongoUser.find({})
      .select('firstName lastName email role createdAt')
      .limit(100)
      .sort({ createdAt: -1 })
      .lean();
  }

  async getUsersByCategory(): Promise<any[]> {
    return MongoUser.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $lookup: {
          from: 'order_items',
          localField: 'orders._id',
          foreignField: 'orderId',
          as: 'orderItems'
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'orderItems.productId',
          foreignField: '_id',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'products.categoryId',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $group: {
          _id: '$categories.name',
          userCount: { $sum: 1 },
          users: {
            $push: {
              firstName: '$firstName',
              lastName: '$lastName',
              email: '$email'
            }
          }
        }
      },
      { $limit: 50 }
    ]);
  }

  async getProductCategoryAnalytics(): Promise<any[]> {
    return MongoProduct.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $group: {
          _id: '$category.name',
          productCount: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          products: {
            $push: {
              title: '$title',
              price: '$price',
              createdAt: '$createdAt'
            }
          }
        }
      },
      {
        $sort: { productCount: -1 }
      },
      { $limit: 20 }
    ]);
  }

  async getOrderTrends(): Promise<any[]> {
    return MongoOrder.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            year: '$_id.year',
            month: '$_id.month'
          },
          orders: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          },
          totalOrders: { $sum: '$count' }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      },
      { $limit: 12 }
    ]);
  }

  async getUserOrderStats(): Promise<any[]> {
    return MongoUser.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $lookup: {
          from: 'order_items',
          localField: 'orders._id',
          foreignField: 'orderId',
          as: 'orderItems'
        }
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          role: 1,
          totalOrders: { $size: '$orders' },
          totalItems: { $sum: '$orderItems.quantity' },
          totalSpent: {
            $sum: {
              $multiply: ['$orderItems.price', '$orderItems.quantity']
            }
          }
        }
      },
      {
        $match: {
          totalOrders: { $gt: 0 }
        }
      },
      {
        $sort: { totalSpent: -1 }
      },
      { $limit: 50 }
    ]);
  }
}