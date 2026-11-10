import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    if (!dto.name || dto.name.trim().length === 0) {
      throw new ConflictException('El nombre del producto es obligatorio');
    }
    if (dto.price < 0) {
      throw new ConflictException('El precio no puede ser negativo');
    }
    if (dto.stock < 0) {
      throw new ConflictException('El stock no puede ser negativo');
    }

    const product = new ProductEntity(
      crypto.randomUUID(),
      dto.name.trim(),
      dto.description?.trim() || '',
      dto.price,
      dto.stock,
    );

    return this.productRepository.create(product);
  }

  async findById(id: string): Promise<ProductEntity> {
    if (!id || id.trim().length === 0) {
      throw new NotFoundException('El ID del producto es obligatorio');
    }

    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductEntity> {
    const existingProduct = await this.findById(id);

    if (dto.name !== undefined) {
      if (dto.name.trim().length === 0) {
        throw new ConflictException('El nombre del producto no puede estar vacío');
      }
      existingProduct.name = dto.name.trim();
    }

    if (dto.description !== undefined) {
      existingProduct.description = dto.description.trim();
    }

    if (dto.price !== undefined) {
      if (dto.price < 0) {
        throw new ConflictException('El precio no puede ser negativo');
      }
      existingProduct.price = dto.price;
    }

    if (dto.stock !== undefined) {
      if (dto.stock < 0) {
        throw new ConflictException('El stock no puede ser negativo');
      }
      existingProduct.stock = dto.stock;
    }

    const updatedProduct = await this.productRepository.update(id, existingProduct);
    if (!updatedProduct) {
      throw new NotFoundException(`No se pudo actualizar el producto con ID ${id}`);
    }

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.productRepository.delete(id);
  }
}