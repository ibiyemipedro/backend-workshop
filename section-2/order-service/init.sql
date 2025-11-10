-- Initialize the database with proper permissions and settings
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(userId);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(orderId);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(productId);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(userId);
CREATE INDEX IF NOT EXISTS idx_cart_product_id ON cart(productId);
CREATE INDEX IF NOT EXISTS idx_cart_user_product ON cart(userId, productId);