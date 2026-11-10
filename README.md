# Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL

En el contexto de una aplicación de gestión de inventario para una tienda online, debes construir operaciones básicas de CRUD (crear, obtener, actualizar y eliminar) en bases de datos SQL y NoSQL. La base de datos SQL almacenará información de productos, mientras que la base de datos NoSQL gestionará los pedidos de los clientes. Debes asegurarte de que las operaciones se realicen de manera eficiente y cumplan con los requisitos de integridad y consistencia de los datos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del Entorno y Conexión a la Base de Datos

**Objetivo:** Establecer una conexión exitosa a la base de datos SQL y NoSQL y configurar el entorno de desarrollo.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura el entorno de desarrollo para trabajar con bases de datos SQL y NoSQL.
- Establece una conexión a la base de datos SQL y verifica que la conexión sea exitosa.
- Establece una conexión a la base de datos NoSQL y verifica que la conexión sea exitosa.

**Entregable:** Entorno de desarrollo configurado con conexiones exitosas a bases de datos SQL y NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar las conexiones a las bases de datos.

</details>

### Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL

**Objetivo:** Implementar operaciones CRUD en la base de datos SQL para gestionar información de productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa la operación de crear un nuevo producto en la base de datos SQL.
- Implementa la operación de obtener información de un producto de la base de datos SQL.
- Implementa la operación de actualizar información de un producto en la base de datos SQL.
- Implementa la operación de eliminar un producto de la base de datos SQL.

**Entregable:** Operaciones CRUD implementadas en la base de datos SQL para gestionar información de productos.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar las operaciones CRUD en la base de datos SQL.

</details>

### Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL

**Objetivo:** Implementar operaciones CRUD en la base de datos NoSQL para gestionar pedidos de clientes.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa la operación de crear un nuevo pedido en la base de datos NoSQL.
- Implementa la operación de obtener información de un pedido de la base de datos NoSQL.
- Implementa la operación de actualizar información de un pedido en la base de datos NoSQL.
- Implementa la operación de eliminar un pedido de la base de datos NoSQL.

**Entregable:** Operaciones CRUD implementadas en la base de datos NoSQL para gestionar pedidos de clientes.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar las operaciones CRUD en la base de datos NoSQL.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en el manejo de bases de datos?
- **paraQueSirve**: ¿Para qué sirve cada operación CRUD en el contexto de una base de datos SQL y NoSQL?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD en bases de datos SQL y NoSQL?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en bases de datos SQL y NoSQL y cómo se pueden resolver?

## Criterios de Evaluacion

- Configuración exitosa del entorno de desarrollo con conexiones a bases de datos SQL y NoSQL.
- Implementación correcta de operaciones CRUD en la base de datos SQL para gestionar información de productos.
- Implementación correcta de operaciones CRUD en la base de datos NoSQL para gestionar pedidos de clientes.
- Uso efectivo de IntelliJ IDEA Debugger para depurar y verificar las operaciones CRUD en ambas bases de datos.
- Manejo adecuado de errores comunes al implementar operaciones CRUD en bases de datos SQL y NoSQL.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
