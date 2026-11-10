import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from '@app/application/services/order.service';
import { OrderEntity } from '@app/domain/entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '@app/application/dto/order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente', type: OrderEntity })
  @ApiResponse({ status: 400, description: 'Datos de pedido inválidos' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const items = createOrderDto.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.price
    }));
    
    return this.orderService.create({
      customerId: createOrderDto.customerId,
      items: items
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado', type: OrderEntity })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiParam({ name: 'id', description: 'ID único del pedido', type: String })
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<OrderEntity | null> {
    return this.orderService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un pedido existente' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado exitosamente', type: OrderEntity })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de pedido inválidos' })
  @ApiParam({ name: 'id', description: 'ID único del pedido', type: String })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<OrderEntity | null> {
    const items = updateOrderDto.items ? updateOrderDto.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.price
    })) : undefined;
    
    return this.orderService.update(id, {
      customerId: updateOrderDto.customerId,
      items: items,
      status: updateOrderDto.status
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un pedido' })
  @ApiResponse({ status: 204, description: 'Pedido eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiParam({ name: 'id', description: 'ID único del pedido', type: String })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.orderService.delete(id);
  }
}