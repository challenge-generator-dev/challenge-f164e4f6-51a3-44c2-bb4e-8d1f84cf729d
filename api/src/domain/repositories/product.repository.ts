import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, product: ProductEntity): Promise<ProductEntity | null>;
  delete(id: string): Promise<void>;
}