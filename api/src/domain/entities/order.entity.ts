import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNotEmpty, ValidateNested, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItem {
  @ApiProperty({ example: '1', description: 'ID del producto' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2, description: 'Cantidad del producto' })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 999.99, description: 'Precio unitario del producto' })
  @IsNumber()
  @IsPositive()
  unitPrice: number;

  constructor(productId: string, quantity: number, unitPrice: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}

export class OrderEntity {
  @ApiProperty({ example: '65a1e8f0c5f3b9d2e8f2b4c5', description: 'Identificador único del pedido' })
  id: string;

  @ApiProperty({ example: '65a1e8f0c5f3b9d2e8f2b4c6', description: 'ID del cliente' })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({
    type: [OrderItem],
    description: 'Lista de items en el pedido',
    example: [{ productId: '1', quantity: 2, unitPrice: 999.99 }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @ApiProperty({ example: '2023-10-01T12:00:00.000Z', description: 'Fecha de creación del pedido' })
  createdAt: Date;

  @ApiProperty({ example: 'PENDING', description: 'Estado del pedido' })
  @IsString()
  @IsNotEmpty()
  status: string;

  constructor(id: string, customerId: string, items: OrderItem[], createdAt: Date, status: string) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.createdAt = createdAt;
    this.status = status;
  }
}