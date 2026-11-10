# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/application/services/order.service.ts` — `OrderItem.map`: Se invoca `map` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.createProduct`: Se invoca `createProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.getProduct`: Se invoca `getProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.updateProduct`: Se invoca `updateProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.deleteProduct`: Se invoca `deleteProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/product.repository.impl.ts` — `ProductEntity.create`: Se invoca `create` sobre `ProductEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/product.repository.impl.ts` — `ProductEntity.findUnique`: Se invoca `findUnique` sobre `ProductEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/product.repository.impl.ts` — `ProductEntity.update`: Se invoca `update` sobre `ProductEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/product.repository.impl.ts` — `ProductEntity.delete`: Se invoca `delete` sobre `ProductEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/order.repository.impl.ts` — `OrderItem.map`: Se invoca `map` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/pages/OrderPage.tsx` — `OrderItemDto.filter`: Se invoca `filter` sobre `OrderItemDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/pages/OrderPage.tsx` — `OrderItemDto.map`: Se invoca `map` sobre `OrderItemDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261109223818458), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del Entorno y Conexión a la Base de Datos — objetivo: Establecer una conexión exitosa a la base de datos SQL y NoSQL y configurar el entorno de desarrollo. — entregable (NO resolver): Entorno de desarrollo configurado con conexiones exitosas a bases de datos SQL y NoSQL.
- Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL — objetivo: Implementar operaciones CRUD en la base de datos SQL para gestionar información de productos. — entregable (NO resolver): Operaciones CRUD implementadas en la base de datos SQL para gestionar información de productos.
- Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL — objetivo: Implementar operaciones CRUD en la base de datos NoSQL para gestionar pedidos de clientes. — entregable (NO resolver): Operaciones CRUD implementadas en la base de datos NoSQL para gestionar pedidos de clientes.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "inventory-api",
  "version": "1.0.0",
  "description": "API para gestión de inventario con bases de datos SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node dist/main.js",
    "start:dev": "ts-node src/main.ts",
    "test": "jest",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^4.0.4",
    "@nestjs/core": "^11.0.0",
    "@nestjs/mongoose": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^11.4.8",
    "@prisma/client": "^5.22.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "mongoose": "^8.5.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^4.17.21",
    "@types/node": "^22.5.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "jest": "^29.7.0",
    "prettier": "^3.3.3",
    "prisma": "^5.22.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.0"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "incremental": true,
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@app/*": ["src/*"],
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('API para gestión de inventario con SQL y NoSQL')
    .setVersion('1.0')
    .addTag('products')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});

// === ARCHIVO: api/src/domain/entities/product.entity.ts ===
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

// === ARCHIVO: api/src/domain/entities/order.entity.ts ===
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

// === ARCHIVO: api/src/domain/repositories/product.repository.ts ===
import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, product: ProductEntity): Promise<ProductEntity | null>;
  delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/domain/repositories/order.repository.ts ===
import { OrderEntity } from '../entities/order.entity';

export interface OrderRepository {
  create(order: OrderEntity): Promise<OrderEntity>;
  findById(id: string): Promise<OrderEntity | null>;
  update(id: string, order: OrderEntity): Promise<OrderEntity | null>;
  delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/app.module.ts ===
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

// === ARCHIVO: api/src/application/services/product.service.ts ===
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

// === ARCHIVO: api/src/application/services/order.service.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/product.controller.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/product.repository.impl.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/order.repository.impl.ts ===
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Document } from 'mongoose';
import { OrderEntity, OrderItem } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';

interface OrderDocument extends Document {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  createdAt: Date;
  status: string;
}

@Injectable()
export class OrderRepositoryImpl implements OrderRepository, OnModuleInit, OnModuleDestroy {
  private orderModel: Model<OrderDocument>;

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit(): Promise<void> {
    if (this.connection.readyState === 1) {
      const schema = new this.connection.Schema<OrderDocument>(
        {
          customerId: { type: String, required: true },
          items: {
            type: [
              {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true, min: 0 },
              },
            ],
            required: true,
            validate: (items: unknown[]) => items.length > 0,
          },
          createdAt: { type: Date, default: Date.now, required: true },
          status: {
            type: String,
            required: true,
            enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            default: 'PENDING',
          },
        },
        {
          collection: 'orders',
          versionKey: false,
          timestamps: false,
        },
      );
      this.orderModel = this.connection.model<OrderDocument>('Order', schema);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.connection.readyState === 1) {
      await this.connection.close();
    }
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const orderItems = order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const created = new this.orderModel({
      customerId: order.customerId,
      items: orderItems,
      createdAt: order.createdAt,
      status: order.status,
    });

    const saved = await created.save();
    return this.mapToEntity(saved);
  }

  async findById(id: string): Promise<OrderEntity | null> {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) {
        return null;
      }
      return this.mapToEntity(order);
    } catch {
      return null;
    }
  }

  async update(id: string, order: OrderEntity): Promise<OrderEntity | null> {
    const orderItems = order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const updated = await this.orderModel
      .findByIdAndUpdate(
        id,
        {
          customerId: order.customerId,
          items: orderItems,
          status: order.status,
        },
        { new: true },
      )
      .exec();

    if (!updated) {
      return null;
    }
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(id).exec();
  }

  private mapToEntity(doc: OrderDocument): OrderEntity {
    const items: OrderItem[] = doc.items.map(
      (item) =>
        new OrderItem(item.productId, item.quantity, item.price),
    );
    return new OrderEntity(
      doc._id.toString(),
      doc.customerId,
      items,
      doc.createdAt,
      doc.status,
    );
  }
}

// === ARCHIVO: api/src/infrastructure/config/database.config.ts ===
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

// === ARCHIVO: api/prisma/schema.prisma ===
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

model Product {
  id          String   @id @default(uuid())
  name        String   @db.VarChar(255)
  description String   @db.Text
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("products")
  @@index([name])
  @@index([price])
}

model Order {
  id         String      @id @default(uuid())
  customerId String      @map("customer_id") @db.VarChar(255)
  createdAt  DateTime    @default(now()) @map("created_at")
  status     OrderStatus @default(PENDING)

  items OrderItem[]

  @@map("orders")
  @@index([customerId])
  @@index([status])
  @@index([createdAt])
}

model OrderItem {
  id        String  @id @default(uuid())
  orderId   String  @map("order_id")
  productId String  @map("product_id") @db.VarChar(255)
  quantity  Int
  price     Decimal @db.Decimal(10, 2)

  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("order_items")
  @@index([orderId])
  @@index([productId])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

// === ARCHIVO: api/src/application/dto/product.dto.ts ===
import { IsString, IsNumber, IsPositive, IsNotEmpty, Min, IsOptional, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gaming Pro',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Laptop de alta gama con procesador Intel i7 y 16GB RAM',
  })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  description: string;

  @ApiProperty({
    description: 'Precio del producto en formato decimal',
    example: 1299.99,
  })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser mayor que cero' })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 50,
  })
  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;
}

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Nombre del producto',
    example: 'Laptop Gaming Pro Updated',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del producto',
    example: 'Laptop actualizada con mejores características',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Precio del producto en formato decimal',
    example: 1399.99,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser mayor que cero' })
  price?: number;

  @ApiPropertyOptional({
    description: 'Cantidad disponible en inventario',
    example: 30,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock?: number;
}

// === ARCHIVO: api/src/application/dto/order.dto.ts ===
export class OrderItemDto {
  productId: string;
  quantity: number;
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class CreateOrderDto {
  customerId: string;
  items: OrderItemDto[];

  constructor(customerId: string, items: OrderItemDto[]) {
    this.customerId = customerId;
    this.items = items;
  }
}

export class UpdateOrderDto {
  customerId: string;
  items: OrderItemDto[];
  status: string;

  constructor(customerId: string, items: OrderItemDto[], status: string) {
    this.customerId = customerId;
    this.items = items;
    this.status = status;
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "inventory-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build --root src",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "axios": "1.7.4",
    "react-router-dom": "6.30.6"
  },
  "devDependencies": {
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.3.1",
    "vite": "5.4.0",
    "typescript": "5.5.3",
    "@types/node": "22.4.0"
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/_variables.scss" as *;',
      },
    },
  },
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProductPage from '@/pages/ProductPage';
import OrderPage from '@/pages/OrderPage';

// HomePage se carga de forma lazy para optimizar el rendimiento inicial
const HomePage = lazy(() => import('@/pages/HomePage'));

const App = () => {
  return (
    <div className="app-container">
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

// === ARCHIVO: client/src/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Aplicación de gestión de inventario para tienda online" />
    <meta name="keywords" content="inventario, productos, pedidos, gestión" />
    <meta name="author" content="Equipo de Desarrollo" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="robots" content="index, follow" />
    <title>Gestión de Inventario - Tienda Online</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html, body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
        min-height: 100vh;
      }
      
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      header {
        background-color: #2c3e50;
        color: white;
        padding: 1rem 2rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      header h1 {
        font-size: 1.5rem;
        font-weight: 600;
      }
      
      nav {
        background-color: #34495e;
        padding: 0.75rem 2rem;
        display: flex;
        gap: 1.5rem;
      }
      
      nav a {
        color: #ecf0f1;
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }
      
      nav a:hover {
        background-color: #2c3e50;
      }
      
      nav a.active {
        background-color: #3498db;
      }
      
      main {
        flex: 1;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
      
      footer {
        background-color: #2c3e50;
        color: #bdc3c7;
        text-align: center;
        padding: 1rem;
        margin-top: auto;
      }
      
      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        font-size: 1.1rem;
        color: #7f8c8d;
      }
      
      .error-message {
        background-color: #e74c3c;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
      
      .success-message {
        background-color: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading-spinner">Cargando aplicación...</div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/pages/ProductPage.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface ProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductEntity extends ProductDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

export default function ProductPage() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductEntity | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const [formData, setFormData] = useState<ProductDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ProductEntity[]>(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      
      if (editingProduct) {
        const response = await axios.put<ProductEntity>(
          `${API_BASE_URL}/products/${editingProduct.id}`,
          formData
        );
        setProducts(prev => 
          prev.map(p => p.id === editingProduct.id ? response.data : p)
        );
        setSuccess('Producto actualizado correctamente');
      } else {
        const response = await axios.post<ProductEntity>(
          `${API_BASE_URL}/products`,
          formData
        );
        setProducts(prev => [...prev, response.data]);
        setSuccess('Producto creado correctamente');
      }
      
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar producto';
      setError(message);
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (product: ProductEntity) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) {
      return;
    }
    
    try {
      setError(null);
      setSuccess(null);
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      setSuccess('Producto eliminado correctamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar producto';
      setError(message);
      console.error('Error deleting product:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: ''
    });
    setEditingProduct(null);
    setIsFormVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="page-header">
        <h2>Gestión de Productos</h2>
        <button 
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="btn btn-primary"
        >
          {isFormVisible ? 'Cancelar' : 'Nuevo Producto'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {isFormVisible && (
        <div className="form-container">
          <h3>{editingProduct ? 'Editar Producto' : 'Crear Producto'}</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ingrese el nombre del producto"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Ingrese la descripción del producto"
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Precio</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="Ingrese la categoría"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingProduct ? 'Actualizar' : 'Crear'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-list">
        <h3>Lista de Productos ({products.length})</h3>
        {products.length === 0 ? (
          <p className="empty-message">No hay productos registrados</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td className="actions">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="btn btn-edit"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-delete"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .page-header h2 {
          font-size: 1.8rem;
          color: #2c3e50;
        }
        
        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .form-container h3 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        
        .product-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-weight: 500;
          color: #34495e;
        }
        
        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3498db;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .btn-primary {
          background-color: #3498db;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #2980b9;
        }
        
        .btn-secondary {
          background-color: #95a5a6;
          color: white;
        }
        
        .btn-secondary:hover {
          background-color: #7f8c8d;
        }
        
        .btn-edit {
          background-color: #f39c12;
          color: white;
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
        }
        
        .btn-delete {
          background-color: #e74c3c;
          color: white;
          padding: 0.5rem 1rem;
        }
        
        .products-list {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .products-list h3 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        
        .products-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .products-table th,
        .products-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .products-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .products-table tbody tr:hover {
          background-color: #f8f9fa;
        }
        
        .actions {
          display: flex;
        }
        
        .empty-message {
          text-align: center;
          color: #7f8c8d;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}

// === ARCHIVO: client/src/pages/OrderPage.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface OrderItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

interface OrderDto {
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItemDto[];
  shippingAddress: string;
}

interface OrderItemEntity extends OrderItemDto {
  id: string;
}

interface OrderEntity extends OrderDto {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

export default function OrderPage() {
  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<OrderEntity | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const [formData, setFormData] = useState<OrderDto>({
    customerId: '',
    customerName: '',
    customerEmail: '',
    items: [{ productId: '', quantity: 1, unitPrice: 0 }],
    shippingAddress: ''
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<OrderEntity[]>(`${API_BASE_URL}/orders`);
      setOrders(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar pedidos';
      setError(message);
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      
      const validItems = formData.items.filter(
        item => item.productId && item.quantity > 0 && item.unitPrice > 0
      );
      
      if (validItems.length === 0) {
        setError('Debe agregar al menos un producto al pedido');
        return;
      }

      if (editingOrder) {
        const response = await axios.put<OrderEntity>(
          `${API_BASE_URL}/orders/${editingOrder.id}`,
          { ...formData, items: validItems }
        );
        setOrders(prev => 
          prev.map(o => o.id === editingOrder.id ? response.data : o)
        );
        setSuccess('Pedido actualizado correctamente');
      } else {
        const response = await axios.post<OrderEntity>(
          `${API_BASE_URL}/orders`,
          { ...formData, items: validItems }
        );
        setOrders(prev => [...prev, response.data]);
        setSuccess('Pedido creado correctamente');
      }
      
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar pedido';
      setError(message);
      console.error('Error saving order:', err);
    }
  };

  const handleEdit = (order: OrderEntity) => {
    setEditingOrder(order);
    setFormData({
      customerId: order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.items.length > 0 ? order.items : [{ productId: '', quantity: 1, unitPrice: 0 }],
      shippingAddress: order.shippingAddress
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este pedido?')) {
      return;
    }
    
    try {
      setError(null);
      setSuccess(null);
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
      setOrders(prev => prev.filter(o => o.id !== id));
      setSuccess('Pedido eliminado correctamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar pedido';
      setError(message);
      console.error('Error deleting order:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      customerId: '',
      customerName: '',
      customerEmail: '',
      items: [{ productId: '', quantity: 1, unitPrice: 0 }],
      shippingAddress: ''
    });
    setEditingOrder(null);
    setIsFormVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, field: keyof OrderItemDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index 
          ? { ...item, [field]: typeof value === 'string' ? value : value }
          : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: '#f39c12',
      processing: '#3498db',
      shipped: '#9b59b6',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#7f8c8d';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="page-header">
        <h2>Gestión de Pedidos</h2>
        <button 
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="btn btn-primary"
        >
          {isFormVisible ? 'Cancelar' : 'Nuevo Pedido'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {isFormVisible && (
        <div className="form-container">
          <h3>{editingOrder ? 'Editar Pedido' : 'Crear Pedido'}</h3>
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-section">
              <h4>Información del Cliente</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerId">ID Cliente</label>
                  <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleInputChange}
                    required
                    placeholder="ID del cliente"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerName">Nombre</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Nombre del cliente"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">Email</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="shippingAddress">Dirección de Envío</label>
                <textarea
                  id="shippingAddress"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Dirección completa"
                  rows={2}
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Productos del Pedido</h4>
              {formData.items.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="form-group">
                    <label>ID Producto</label>
                    <input
                      type="text"
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      required
                      placeholder="ID del producto"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cantidad</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      required
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio Unitario</label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeItem(index)}
                    className="btn btn-remove"
                    disabled={formData.items.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button type="button" onClick={addItem} className="btn btn-secondary">
                + Agregar Producto
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingOrder ? 'Actualizar' : 'Crear'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="orders-list">
        <h3>Lista de Pedidos ({orders.length})</h3>
        {orders.length === 0 ? (
          <p className="empty-message">No hay pedidos registrados</p>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Pedido #{order.id}</span>
                  <span 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
                
                <div className="order-body">
                  <div className="order-info">
                    <strong>Cliente:</strong> {order.customerName}
                  </div>
                  <div className="order-info">
                    <strong>Email:</strong> {order.customerEmail}
                  </div>
                  <div className="order-info">
                    <strong>Dirección:</strong> {order.shippingAddress}
                  </div>
                  <div className="order-info">
                    <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                  </div>
                  <div className="order-info">
                    <strong>Fecha:</strong> {formatDate(order.createdAt)}
                  </div>
                  <div className="order-items">
                    <strong>Productos ({order.items.length}):</strong>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          Producto: {item.productId} | Cant: {item.quantity} | ${item.unitPrice.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="order-actions">
                  <button 
                    onClick={() => handleEdit(order)}
                    className="btn btn-edit"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(order.id)}
                    className="btn btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .page-header h2 {
          font-size: 1.8rem;
          color: #2c3e50;
        }
        
        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .form-container h3 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        
        .form-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
        }
        
        .form-section h4 {
          margin-bottom: 1rem;
          color: #34495e;
        }
        
        .order-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-weight: 500;
          color: #34495e;
        }
        
        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3498db;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .item-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 1rem;
          align-items: end;
          margin-bottom: 1rem;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .btn-primary {
          background-color: #3498db;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #2980b9;
        }
        
        .btn-secondary {
          background-color: #95a5a6;
          color: white;
        }
        
        .btn-secondary:hover {
          background-color: #7f8c8d;
        }
        
        .btn-remove {
          background-color: #e74c3c;
          color: white;
          padding: 0.75rem;
          font-size: 1.2rem;
          line-height: 1;
        }
        
        .btn-edit {
          background-color: #f39c12;
          color: white;
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
        }
        
        .btn-delete {
          background-color: #e74c3c;
          color: white;
          padding: 0.5rem 1rem;
        }
        
        .orders-list {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .orders-list h3 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        
        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .order-card {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #f8f9fa;
          border-bottom: 1px solid #eee;
        }
        
        .order-id {
          font-weight: 600;
          color: #2c3e50;
        }
        
        .order-status {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          color: white;
          font-size: 0.85rem;
          text-transform: capitalize;
        }
        
        .order-body {
          padding: 1rem;
        }
        
        .order-info {
          margin-bottom: 0.5rem;
          color: #555;
        }
        
        .order-items {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }
        
        .order-items ul {
          margin-top: 0.5rem;
          padding-left: 1.5rem;
        }
        
        .order-actions {
          display: flex;
          padding: 1rem;
          border-top: 1px solid #eee;
        }
        
        .empty-message {
          text-align: center;
          color: #7f8c8d;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/pages/HomePage.tsx ===
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  // Props del componente si las hay
}

const HomePage: React.FC<HomePageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <div className="home-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Sistema de Gestión de Inventario</h1>
        <p style={{ color: '#666' }}>Bienvenido al panel de control</p>
        <small style={{ color: '#999' }}>Hora actual: {currentTime}</small>
      </header>

      <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', transition: 'box-shadow 0.2s' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Gestión de Productos</h2>
          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>Administra el catálogo de productos disponibles en el inventario.</p>
          <Link 
            to="/products" 
            style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#1976d2', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}
          >
            Ir a Productos
          </Link>
        </div>

        <div className="card" style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', transition: 'box-shadow 0.2s' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Gestión de Pedidos</h2>
          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>Visualiza y gestiona los pedidos de los clientes.</p>
          <Link 
            to="/orders" 
            style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#388e3c', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}
          >
            Ir a Pedidos
          </Link>
        </div>
      </nav>

      <section style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Información del Sistema</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#555' }}>
          <li style={{ marginBottom: '0.5rem' }}>Base de datos SQL: Gestión de productos</li>
          <li style={{ marginBottom: '0.5rem' }}>Base de datos NoSQL: Gestión de pedidos</li>
          <li style={{ marginBottom: '0.5rem' }}>Interfaz RESTful para operaciones CRUD</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;

// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
