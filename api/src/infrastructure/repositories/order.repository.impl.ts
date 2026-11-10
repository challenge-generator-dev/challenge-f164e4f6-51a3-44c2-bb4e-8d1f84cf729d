import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Document } from 'mongoose';
import { OrderEntity, OrderItem } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';

interface OrderDocument extends Document {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  createdAt: Date;
  status: string;
}

@Injectable()
export class OrderRepositoryImpl implements OrderRepository, OnModuleInit, OnModuleDestroy {
  private orderModel: Model<OrderDocument>;

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit(): Promise<void> {
    if (this.connection.readyState === 1) {
      const schema = new this.connection.Schema<OrderDocument>(
        {
          customerId: { type: String, required: true },
          items: {
            type: [
              {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true, min: 0 },
              },
            ],
            required: true,
            validate: (items: unknown[]) => items.length > 0,
          },
          createdAt: { type: Date, default: Date.now, required: true },
          status: {
            type: String,
            required: true,
            enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            default: 'PENDING',
          },
        },
        {
          collection: 'orders',
          versionKey: false,
          timestamps: false,
        },
      );
      this.orderModel = this.connection.model<OrderDocument>('Order', schema);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.connection.readyState === 1) {
      await this.connection.close();
    }
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const orderItems = order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const created = new this.orderModel({
      customerId: order.customerId,
      items: orderItems,
      createdAt: order.createdAt,
      status: order.status,
    });

    const saved = await created.save();
    return this.mapToEntity(saved);
  }

  async findById(id: string): Promise<OrderEntity | null> {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) {
        return null;
      }
      return this.mapToEntity(order);
    } catch {
      return null;
    }
  }

  async update(id: string, order: OrderEntity): Promise<OrderEntity | null> {
    const orderItems = order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const updated = await this.orderModel
      .findByIdAndUpdate(
        id,
        {
          customerId: order.customerId,
          items: orderItems,
          status: order.status,
        },
        { new: true },
      )
      .exec();

    if (!updated) {
      return null;
    }
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(id).exec();
  }

  private mapToEntity(doc: OrderDocument): OrderEntity {
    const items: OrderItem[] = doc.items.map(
      (item) =>
        new OrderItem(item.productId, item.quantity, item.price),
    );
    return new OrderEntity(
      doc._id.toString(),
      doc.customerId,
      items,
      doc.createdAt,
      doc.status,
    );
  }
}