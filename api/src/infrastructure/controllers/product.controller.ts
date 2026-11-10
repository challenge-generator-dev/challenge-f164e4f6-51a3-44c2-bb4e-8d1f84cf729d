import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductService } from '@app/application/services/product.service';
import { ProductEntity } from '@app/domain/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '@app/application/dto/product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Datos de producto inválidos' })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = new ProductEntity(
      crypto.randomUUID(),
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.stock
    );
    return this.productService.createProduct(product);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiParam({ name: 'id', description: 'ID único del producto', type: String })
  async getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductEntity | null> {
    return this.productService.getProduct(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de producto inválidos' })
  @ApiParam({ name: 'id', description: 'ID único del producto', type: String })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ProductEntity | null> {
    const product = new ProductEntity(
      id,
      updateProductDto.name,
      updateProductDto.description,
      updateProductDto.price,
      updateProductDto.stock
    );
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiParam({ name: 'id', description: 'ID único del producto', type: String })
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}