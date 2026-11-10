import { OrderEntity } from '../entities/order.entity';

export interface OrderRepository {
  create(order: OrderEntity): Promise<OrderEntity>;
  findById(id: string): Promise<OrderEntity | null>;
  update(id: string, order: OrderEntity): Promise<OrderEntity | null>;
  delete(id: string): Promise<void>;
}