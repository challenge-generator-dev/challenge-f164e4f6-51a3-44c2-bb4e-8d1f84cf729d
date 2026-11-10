import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from 'prisma';
import { ProductController } from './infrastructure/controllers/product.controller';
import { OrderController } from './infrastructure/controllers/order.controller';
import { ProductService } from './application/services/product.service';
import { OrderService } from './application/services/order.service';
import { ProductRepository } from './domain/repositories/product.repository';
import { OrderRepository } from './domain/repositories/order.repository';
import { ProductRepositoryImpl } from './infrastructure/repositories/product.repository.impl';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { DatabaseConfig } from './infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => new DatabaseConfig(new ConfigService()).getConfig()],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.nosql.uri'),
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  controllers: [ProductController, OrderController],
  providers: [
    ProductService,
    OrderService,
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
  ],
})
export class AppModule {}