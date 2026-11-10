import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '@app/domain/repositories/product.repository';
import { ProductEntity } from '@app/domain/entities/product.entity';

@Injectable()
export class ProductRepositoryImpl extends PrismaClient implements ProductRepository, OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const created = await this.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
    return new ProductEntity(
      created.id,
      created.name,
      created.description,
      created.price,
      created.stock
    );
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const found = await this.product.findUnique({
      where: { id },
    });
    if (!found) {
      return null;
    }
    return new ProductEntity(
      found.id,
      found.name,
      found.description,
      found.price,
      found.stock
    );
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity | null> {
    const updated = await this.product.update({
      where: { id },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
    return new ProductEntity(
      updated.id,
      updated.name,
      updated.description,
      updated.price,
      updated.stock
    );
  }

  async delete(id: string): Promise<void> {
    await this.product.delete({
      where: { id },
    });
  }
}