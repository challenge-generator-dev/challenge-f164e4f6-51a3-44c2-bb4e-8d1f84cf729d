import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { OrderRepository } from '@app/domain/repositories/order.repository';
import { OrderEntity, OrderItem } from '@app/domain/entities/order.entity';

export interface CreateOrderDto {
  customerId: string;
  items: OrderItemDto[];
}

export interface UpdateOrderDto {
  customerId?: string;
  items?: OrderItemDto[];
  status?: string;
}

export interface OrderItemDto {
  productId: string;
  quantity: number;
  price: number;
}

const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    if (!dto.customerId || dto.customerId.trim().length === 0) {
      throw new ConflictException('El ID del cliente es obligatorio');
    }

    if (!dto.items || dto.items.length === 0) {
      throw new ConflictException('El pedido debe tener al menos un artículo');
    }

    for (const item of dto.items) {
      if (!item.productId || item.productId.trim().length === 0) {
        throw new ConflictException('El ID del producto es obligatorio en cada artículo');
      }
      if (item.quantity <= 0) {
        throw new ConflictException('La cantidad de cada artículo debe ser mayor a cero');
      }
      if (item.price < 0) {
        throw new ConflictException('El precio unitario no puede ser negativo');
      }
    }

    const items: OrderItem[] = dto.items.map(
      (item) => new OrderItem(item.productId, item.quantity, item.price),
    );

    const order = new OrderEntity(
      crypto.randomUUID(),
      dto.customerId.trim(),
      items,
      new Date(),
      'pending',
    );

    return this.orderRepository.create(order);
  }

  async findById(id: string): Promise<OrderEntity> {
    if (!id || id.trim().length === 0) {
      throw new NotFoundException('El ID del pedido es obligatorio');
    }

    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return order;
  }

  async update(id: string, dto: UpdateOrderDto): Promise<OrderEntity> {
    const existingOrder = await this.findById(id);

    if (dto.customerId !== undefined) {
      if (dto.customerId.trim().length === 0) {
        throw new ConflictException('El ID del cliente no puede estar vacío');
      }
      existingOrder.customerId = dto.customerId.trim();
    }

    if (dto.items !== undefined) {
      if (dto.items.length === 0) {
        throw new ConflictException('El pedido debe tener al menos un artículo');
      }

      for (const item of dto.items) {
        if (!item.productId || item.productId.trim().length === 0) {
          throw new ConflictException('El ID del producto es obligatorio en cada artículo');
        }
        if (item.quantity <= 0) {
          throw new ConflictException('La cantidad de cada artículo debe ser mayor a cero');
        }
        if (item.price < 0) {
          throw new ConflictException('El precio unitario no puede ser negativo');
        }
      }

      existingOrder.items = dto.items.map(
        (item) => new OrderItem(item.productId, item.quantity, item.price),
      );
    }

    if (dto.status !== undefined) {
      const normalizedStatus = dto.status.toLowerCase();
      if (!ORDER_STATUSES.includes(normalizedStatus)) {
        throw new ConflictException(
          `Estado inválido. Estados permitidos: ${ORDER_STATUSES.join(', ')}`,
        );
      }
      existingOrder.status = normalizedStatus;
    }

    const updatedOrder = await this.orderRepository.update(id, existingOrder);
    if (!updatedOrder) {
      throw new NotFoundException(`No se pudo actualizar el pedido con ID ${id}`);
    }

    return updatedOrder;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.orderRepository.delete(id);
  }
}