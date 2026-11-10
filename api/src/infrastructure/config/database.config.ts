import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

@Injectable()
export class DatabaseConfig implements OnModuleInit, OnModuleDestroy {
  private prismaClient: PrismaClient;
  private mongooseClient: Mongoose | null = null;
  private readonly connectionPromises: Map<string, Promise<void>> = new Map();

  constructor(private readonly configService: ConfigService) {
    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: this.getPostgresUrl(),
        },
      },
      log: ['warn', 'error'],
    });
  }

  private getPostgresUrl(): string {
    const host = this.configService.get<string>('POSTGRES_HOST', 'localhost');
    const port = this.configService.get<string>('POSTGRES_PORT', '5432');
    const database = this.configService.get<string>('POSTGRES_DB', 'inventory');
    const user = this.configService.get<string>('POSTGRES_USER', 'postgres');
    const password = this.configService.get<string>('POSTGRES_PASSWORD', 'postgres');
    const ssl = this.configService.get<boolean>('POSTGRES_SSL', false);

    const baseUrl = `postgresql://${user}:${password}@${host}:${port}/${database}`;
    return ssl ? `${baseUrl}?sslmode=require` : baseUrl;
  }

  private getMongoUrl(): string {
    const host = this.configService.get<string>('MONGO_HOST', 'localhost');
    const port = this.configService.get<string>('MONGO_PORT', '27017');
    const database = this.configService.get<string>('MONGO_DB', 'inventory');
    const user = this.configService.get<string>('MONGO_USER', '');
    const password = this.configService.get<string>('MONGO_PASSWORD', '');

    if (user && password) {
      return `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`;
    }
    return `mongodb://${host}:${port}/${database}`;
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.prismaClient.$connect();
      console.log('PostgreSQL connected successfully');
    } catch (error) {
      console.error('Failed to connect to PostgreSQL:', error);
      throw error;
    }

    try {
      await this.connectMongo();
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.prismaClient.$disconnect();
    if (this.mongooseClient) {
      await this.mongooseClient.connection.close();
    }
  }

  getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }

  getMongoConnection(): mongoose.Connection | null {
    return this.mongooseClient?.connection || null;
  }

  private async connectMongo(): Promise<void> {
    const mongoUrl = this.getMongoUrl();
    const connectionKey = 'mongo';

    if (this.connectionPromises.has(connectionKey)) {
      await this.connectionPromises.get(connectionKey);
      return;
    }

    const connectPromise = this.establishMongoConnection(mongoUrl);
    this.connectionPromises.set(connectionKey, connectPromise);
    await connectPromise;
  }

  private async establishMongoConnection(url: string): Promise<void> {
    const options: ConnectOptions = {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    this.mongooseClient = await mongoose.connect(url, options);
  }

  async healthCheck(): Promise<{ postgres: boolean; mongodb: boolean }> {
    let postgresHealthy = false;
    let mongodbHealthy = false;

    try {
      await this.prismaClient.$queryRaw`SELECT 1`;
      postgresHealthy = true;
    } catch {
      postgresHealthy = false;
    }

    try {
      if (this.mongooseClient && this.mongooseClient.connection.readyState === 1) {
        await this.mongooseClient.connection.db.admin().ping();
        mongodbHealthy = true;
      }
    } catch {
      mongodbHealthy = false;
    }

    return { postgres: postgresHealthy, mongodb: mongodbHealthy };
  }
}