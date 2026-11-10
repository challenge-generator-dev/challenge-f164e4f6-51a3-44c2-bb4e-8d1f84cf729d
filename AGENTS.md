# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL**.

| | |
|---|---|
| Tema | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| Nivel | trainee-l2 |
| Chapter | Frontend |
| Especialidad | React |
| Stack | TypeScript / React 19 + Vite |
| Patron arquitectonico | componentes funcionales con hooks y consumo de API REST |
| Tiempo estimado | 8 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json, vite.config.ts y tsconfig.json en la raiz`
- `src/main.tsx como entry point`
- `src/app con el arbol de rutas`
- `src/features con componentes contenedores y sus hooks`
- `src/shared con componentes presentacionales`
- `src/services con los clientes HTTP`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET. `@types/react-router-dom` ya no se publica para v6+, React Router trae sus tipos.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.

Dependencias:

- react 19.0.0-rc-65a56d0e-20241020
- react-dom 19.0.0-rc-65a56d0e-20241020
- @types/react 18.3.3
- @types/react-dom 18.3.0
- vite 5.4.0
- @vitejs/plugin-react 4.3.1
- axios 1.7.4
- react-router-dom 6.26.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración del Entorno y Conexión a la Base de Datos**: Entorno de desarrollo configurado con conexiones exitosas a bases de datos SQL y NoSQL.
- **Fase 2 — Implementación de Operaciones CRUD en Base de Datos SQL**: Operaciones CRUD implementadas en la base de datos SQL para gestionar información de productos.
- **Fase 3 — Implementación de Operaciones CRUD en Base de Datos NoSQL**: Operaciones CRUD implementadas en la base de datos NoSQL para gestionar pedidos de clientes.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (12)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `api/src/application/services/order.service.ts` — `OrderItem.map`
      Se invoca `map` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.createProduct`
      Se invoca `createProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.getProduct`
      Se invoca `getProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.updateProduct`
      Se invoca `updateProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/controllers/product.controller.ts` — `ProductService.deleteProduct`
      Se invoca `deleteProduct` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/repositories/product.repository.impl.ts` — `ProductEntity.create`
      Se invoca `create` sobre `ProductEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/repositories/product.repository.impl.ts` — `ProductEntity.findUnique`
      Se invoca `findUnique` sobre `ProductEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/repositories/product.repository.impl.ts` — `ProductEntity.update`
      Se invoca `update` sobre `ProductEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/repositories/product.repository.impl.ts` — `ProductEntity.delete`
      Se invoca `delete` sobre `ProductEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/repositories/order.repository.impl.ts` — `OrderItem.map`
      Se invoca `map` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/pages/OrderPage.tsx` — `OrderItemDto.filter`
      Se invoca `filter` sobre `OrderItemDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/pages/OrderPage.tsx` — `OrderItemDto.map`
      Se invoca `map` sobre `OrderItemDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (33)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/main.ts`
- `api/src/domain/entities/product.entity.ts`
- `api/src/domain/entities/order.entity.ts`
- `api/src/domain/repositories/product.repository.ts`
- `api/src/domain/repositories/order.repository.ts`
- `api/src/app.module.ts`
- `api/src/application/services/product.service.ts`
- `api/src/application/services/order.service.ts`
- `api/src/infrastructure/controllers/product.controller.ts`
- `api/src/infrastructure/controllers/order.controller.ts`
- `api/src/infrastructure/repositories/product.repository.impl.ts`
- `api/src/infrastructure/repositories/order.repository.impl.ts`
- `api/src/infrastructure/config/database.config.ts`
- `api/prisma/schema.prisma`
- `api/src/application/dto/product.dto.ts`
- `api/src/application/dto/order.dto.ts`
- `client/package.json`
- `client/vite.config.ts`
- `client/tsconfig.json`
- `client/src/main.tsx`
- `client/src/App.tsx`
- `client/src/index.html`
- `client/src/pages/ProductPage.tsx`
- `client/src/pages/OrderPage.tsx`
- `client/src/index.css`
- `client/src/pages/HomePage.tsx`
- `.run/api.run.xml`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`
- `infra-local/mongo/init.js`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `api`
- `api/src/domain/entities`
- `api/src/domain/repositories`
- `api/src/application/services`
- `api/src/infrastructure/controllers`
- `api/src/infrastructure/repositories`
- `api/src/infrastructure/config`
- `client`
- `client/src/components`
- `client/src/hooks`
- `client/src/services`
- `client/src/types`
- `client/src/pages`

## Verificacion

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **componentes funcionales con hooks y consumo de API REST**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2
- Brecha que el reto ataca: Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261109223818458), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
