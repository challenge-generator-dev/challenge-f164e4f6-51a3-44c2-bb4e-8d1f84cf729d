import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsPositive, IsNotEmpty } from 'class-validator';

export class ProductEntity {
  @ApiProperty({ example: '1', description: 'Identificador único del producto' })
  id: string;

  @ApiProperty({ example: 'Laptop', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Laptop de alto rendimiento', description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 999.99, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 10, description: 'Cantidad disponible en inventario' })
  @IsNumber()
  @IsPositive()
  stock: number;

  constructor(id: string, name: string, description: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}