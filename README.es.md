# 🐉 Yakuza Like a Dragon API

<a id="-index"></a>

## 📑 Índice

- [🎯 Objetivo del Proyecto](#-objetivo-del-proyecto)
- [🛠️ Stack Técnico (Tecnologías Utilizadas)](#️-stack-técnico-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [👀 Requisitos Previos](#-requisitos-previos)
- [⚙️ Instalación (Local)](#️-instalación-local)
- [🐳 Instalación (Docker)](#-instalación-docker)
- [⏩ Funcionalidades](#-funcionalidades)
  - [➕ Agregar Elemento](#-agregar-elemento)
  - [👁️ Mostrar Detalles del Elemento](#-mostrar-detalles-del-elemento)
  - [✏️ Editar Elemento](#-editar-elemento)
  - [🚮 Eliminar Elemento](#-eliminar-elemento)
  - [🔁 Cambiar de Lista](#-cambiar-de-lista)
- [🔌 Puntos Finales de la API](#-puntos-finales-de-la-api)
- [👤 Autor](#-autor)

---

<a id="-objetivo-del-proyecto"></a>

## 🎯 Objetivo del Proyecto

El objetivo de este proyecto es crear una aplicación full stack utilizando el **MERN Stack** (MongoDB, Express, React, Node.js).

La aplicación debe realizar **diversas operaciones CRUD** (Create, Read, Update, Delete) a través de una API RESTful y proporcionar un frontend intuitivo para realizarlas.

La aplicación debe contar con las siguientes funcionalidades:

- Listar elementos
- Crear elementos
- Editar elementos
- Eliminar elementos
- Mostrar detalles de los elementos
- Gestionar base de datos con MongoDB

---

<a id="️-stack-técnico-tecnologías-utilizadas"></a>

## 🛠️ Stack Técnico (Tecnologías Utilizadas)

- **Runtime:** Node.js
- **Backend (API RESTful):** Express.js
- **Base de Datos:** MongoDB
- **Gestión de Errores:** Middleware Personalizado
- **CORS:** Configuración para Solicitudes Cruzadas
- **API-DOCS**: Swagger
- **Frontend:** React (TypeScript)
- **Estilos:** CSS + Bootstrap
- **Iconos:** Font Awesome
- **Fuentes Utilizadas:** [Edo SZ](https://www.dafont.com/edo-sz.font?text=Mysterious+Hitman), [Noto Sans Display](https://fonts.google.com/download/next-steps?categoryFilters=Feeling:%2FExpressive%2FBusiness)
- **Gestión de Formularios:** React Hook Form
- **Validaciones:** Zod (frontend), Mongoose + validadores personalizados (backend)
- **Solicitudes Asincrónicas:** Axios
- **Contenedor:** Docker
- **Imágenes de Docker:** [Node:22 Alpine](https://hub.docker.com/layers/library/node/22-alpine/images/sha256-3a4802e64ab5181c7870d6ddd8c824c2efc42873baae37d1971451668659483b), [Nginx:1.29.6 Alpine](https://hub.docker.com/_/nginx/) y [MongoDB 8.0](https://hub.docker.com/_/mongo)

---

<a id="-estructura-del-proyecto"></a>

## 📁 Estructura del Proyecto

```
/
├─ .dockerignore
├─ README.md
├─ compose.yaml
├─ frontend
│  ├─ .dockerignore
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ assets
│  │  │  ├─ background.png
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ Alert.tsx
│  │  │  ├─ Button.tsx
│  │  │  ├─ Card.tsx
│  │  │  ├─ Form.tsx
│  │  │  ├─ Input.tsx
│  │  │  ├─ List.tsx
│  │  │  ├─ MainCharacterForm
│  │  │  │  ├─ MainCharacterForm.css
│  │  │  │  └─ MainCharacterForm.tsx
│  │  │  ├─ MainCharacterList
│  │  │  │  ├─ MainCharacterList.css
│  │  │  │  └─ MainCharacterList.tsx
│  │  │  ├─ MainCharacterModal
│  │  │  │  ├─ MainCharacterModal.css
│  │  │  │  └─ MainCharacterModal.tsx
│  │  │  ├─ Modal.tsx
│  │  │  ├─ SujimonForm
│  │  │  │  ├─ SujimonForm.css
│  │  │  │  └─ SujimonForm.tsx
│  │  │  ├─ SujimonList
│  │  │  │  ├─ SujimonList.css
│  │  │  │  └─ SujimonList.tsx
│  │  │  ├─ SujimonModal
│  │  │  │  ├─ SujimonModal.css
│  │  │  │  └─ SujimonModal.tsx
│  │  │  └─ Textarea.tsx
│  │  ├─ constants
│  │  │  └─ consts.ts
│  │  ├─ fonts
│  │  │  ├─ edo_sz
│  │  │  └─ Noto_Sans_Display
│  │  ├─ hooks
│  │  │  ├─ useAlert.ts
│  │  │  └─ useAxios.ts
│  │  ├─ index.css
│  │  ├─ main.tsx
│  │  ├─ schemas
│  │  │  ├─ mainCharacter.ts
│  │  │  └─ sujimon.ts
│  │  └─ types
│  │     ├─ ListType.ts
│  │     ├─ Main_Character.ts
│  │     └─ Sujimon.ts
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
├─ mongodb
│  ├─ .dockerignore
│  ├─ .gitignore
│  ├─ .env.example
│  └─ compose.yaml
└─ yakuza_like_a_dragon_api
   ├─ .dockerignore
   ├─ .gitignore
   ├─ .env.example
   ├─ Dockerfile
   ├─ index.js
   ├─ middlewares
   │  ├─ handleErrors.js
   │  └─ notFound.js
   ├─ models
   │  ├─ Main_Character.js
   │  └─ Sujimon.js
   ├─ mongo.js
   ├─ package-lock.json
   ├─ package.json
   ├─ seeders
   │  ├─ mainCharacterSeeder.js
   │  ├─ seed.js
   │  └─ sujimonSeeder.js
   └─ validators
      ├─ validateMainCharacter.js
      └─ validateSujimon.js

```

**Nota**: En el proyecto del repositorio faltan directorios como `node_modules`, esenciales para el funcionamiento de la aplicación. Más adelante, siguiendo los pasos de instalación, se pueden restaurar.

---

<a id="-requisitos-previos"></a>

## 👀 Requisitos Previos

- **[Node JS 22.21.1](https://nodejs.org/en/download)**
- **[Git](https://git-scm.com/install/)**
- **[Docker Engine (si deseas usarlo desde un contenedor)](https://docs.docker.com/engine/install/)**
- **[MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator)**

**Nota 1**: Es posible que si trabajas desde una distribución Linux ya tengas Git instalado. Puedes verificarlo con el siguiente comando:

```bash
git --version
```

La salida debería ser similar a la siguiente:

```bash
git version 2.43.0
```

**Nota 2**: Para agilizar la preparación de MongoDB y la base de datos si deseas instalarla y usarla localmente, el proyecto tiene un directorio `mongodb` con un archivo `.env.example` y `compose.yaml` para lanzar un contenedor Docker con MongoDB sin ninguna configuración extra. Para hacerlo, sigue los **siguientes pasos:**

**Paso 1:** Una vez que tengas el repositorio clonado (ve [el primer paso de **⚙️ Instalación (Local)**](#️-instalación-local) para saber cómo hacerlo), desde la raíz del proyecto, navega al directorio `mongodb`:

```bash
cd mongodb
```

**Paso 2:** Verifica que tengas el puerto **27017** disponible:

```bash
aaroncanofdez@aaron-cano-disk:~$ ss -punta | grep 27017
Netid State      Recv-Q Send-Q        Local Address:Port     Peer Address:Port  Process
tcp   ESTAB     0      0                172.23.0.1:39594     172.23.0.2:27017
tcp   ESTAB     0      0                172.23.0.1:39600     172.23.0.2:27017
```

Si `Local Address:Port` no muestra:

```bash
127.0.0.1:27017
```

El puerto está disponible y no necesitas configurar nada más, ya que Docker Compose usará automáticamente el puerto 27017 al crear el contenedor de MongoDB. Si lo muestra, necesitarás hacer una copia de `.env.example` para crear un archivo `.env` y especificar un puerto disponible:

```bash
cp .env.example .env
```

```env
MONGO_PORT=(PUERTO QUE TENGAS DISPONIBLE o dejar vacío para usar 27017)
```

Ahora solo necesitas iniciar el contenedor:

```bash
docker compose up --build -d
```

Y verás que está activo:

```bash
docker ps
```

```bash
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                    PORTS                                             NAMES
65572c0afa94   mongo:8.0             "docker-entrypoint.s…"   10 seconds ago   Up 10 seconds             0.0.0.0:27017->27017/tcp, [::]:27017->27017/tcp   yakuza_like_a_dragon_mongo
```

---

<a id="️-instalación-local"></a>

## ⚙️ Instalación (Local)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/aaroncano2006/yakuza_like_a_dragon_api.git
```

O con clave SSH:

```bash
git clone git@github.com:aaroncano2006/yakuza_like_a_dragon_api.git
```

### 2. Instalar Dependencias del Backend

```bash
cd yakuza_like_a_dragon_api
npm install
```

### 3. Configurar Variables de Entorno (Backend)

Copia el archivo `.env.example` con el nombre `.env`

```env
cp .env.example .env
```

Rellena las variables de entorno para ejecución local:

```env
MONGODB_URI=mongodb://localhost:(puerto de MongoDB, por defecto: 27017)/db
CORS_ORIGIN=http://localhost:3001
HOST=http://localhost
PORT=3001
```

### 4. Instalar Dependencias del Frontend

Navega al directorio `frontend`

```bash
cd ../frontend
npm install
```

### 5. Ejecutar Seeder (Opcional)

El proyecto tiene datos de prueba para probar la funcionalidad del frontend. Para cargarlos, simplemente ejecuta el siguiente comando:

```bash
cd ../yakuza_like_a_dragon_api
npm run seed
```

**Nota:** Para evitar duplicación o errores adicionales, los seeders solo funcionarán si la base de datos está vacía.

### 6. Ejecutar la Aplicación

En una terminal, desde la carpeta `yakuza_like_a_dragon_api/`:

```bash
npm run dev
```

En otra terminal, desde la carpeta `frontend/`:

```bash
npm run dev
```

Accede a la URL proporcionada por la salida de Vite (normalmente [`http://localhost:5173`](http://localhost:5173)):

```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

![alt text](readme_src/01.png)

Si accedes a [`localhost:3001`](http://localhost:3001) verás un healthcheck detallado sobre la API y en [`localhost:3001/api-docs`](http://localhost:3001/api-docs) podrás consultar la documentación de la API y probar los puntos finales:

![alt text](readme_src/02.png)

![alt text](readme_src/03.png)

---

<a id="-instalación-docker"></a>

## 🐳 Instalación (Docker)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/aaroncano2006/yakuza_like_a_dragon_api.git
```

O con clave SSH:

```bash
git clone git@github.com:aaroncano2006/yakuza_like_a_dragon_api.git
```

### 2. Configurar Variables de Entorno (Backend)

Navega a `yakuza_like_a_dragon_api`:

```bash
cd yakuza_like_a_dragon_api
```

Copia el archivo `.env.example` con el nombre `.env`

```env
cp .env.example .env
```

Rellena las variables de entorno para ejecución en Docker:

```env
# FOR DOCKER
MONGODB_URI=mongodb://mongo:27017/yakuza_like_a_dragon_api
CORS_ORIGIN=http://localhost:3001
HOST=http://localhost
PORT=3001
```

Es importante que el host de MongoDB sea el indicado anteriormente, para que la API pueda reconocer el contenedor dentro de la red Docker y realizar las solicitudes. Usar `localhost` y el puerto que apunta MongoDB local resultará en un error.

### 3. Crear `.env` en la Raíz del Proyecto

Navega a la raíz del proyecto:

```bash
cd ..
```

Copia el archivo `.env.example` con el nombre `.env` y rellena la variable de entorno con el puerto en tu máquina que se utilizará

```bash
cp .env.example .env
```

```env
MONGO_PORT=27017 # (Puede ser otro puerto disponible, o dejar vacío para usar 27017 por defecto)
```

### 4. Ejecutar Docker Compose

```bash
docker compose up --build -d
```

Esto traerá 3 contenedores:

- MongoDB 8.0
- API (en Node 22 Alpine)
- Frontend (en Nginx)

Accede al frontend desde [`localhost:8080`](http://localhost:8080):

![alt text](readme_src/04.png)

**Nota:** Cuando ejecutes la aplicación con Docker, los seeders con datos de prueba se ejecutan automáticamente. No necesitas ejecutarlos manualmente como en la instalación local.

Accede a [`localhost:3001`](http://localhost:3001) para ver el healthcheck y a [`localhost:3001/api-docs`](http://localhost:3001/api-docs) para consultar la documentación de la API y probar los puntos finales:

![alt text](readme_src/05.png)

![alt text](readme_src/06.png)

---

<a id="-funcionalidades"></a>

## ⏩ Funcionalidades

<a id="-agregar-elemento"></a>

### ➕ Agregar Elemento

Al hacer clic en el botón **Agregar Personaje Principal** o **Agregar Sujimon**, abrimos una ventana Modal con el formulario de creación:

![alt text](readme_src/07.png)

![alt text](readme_src/08.png)

Los campos obligatorios y validaciones para Personaje Principal son los siguientes:

- **Nombre**: Obligatorio. Mínimo un carácter, no puede estar vacío.

- **Fecha de Nacimiento**: Opcional. Formato de fecha válido (por ejemplo: dd/mm/YYYY).

- **Trabajos**: Opcional. Texto separado por "," (ejemplo: _Héroe,Freelancer_), convertido internamente a array.

- **Imagen**: Opcional. URL válida.

- **Descripción**: Opcional.

- **¿Es Jugable?**: Marca la casilla dependiendo de si el personaje es jugable o no. Si no la marcas, la aplicación guardará el personaje como no jugable.

Si se crea correctamente, verás una alerta indicándolo.

![alt text](readme_src/09.png)

![alt text](readme_src/10.png)

Los campos obligatorios y validaciones para Sujimon son los siguientes:

- **Nombre**: Obligatorio. Mínimo un carácter, no puede estar vacío.

- **ID**: Obligatorio. ID numérico que corresponde a su entrada en el Sujidex del videojuego Yakuza Like a Dragon.

- **Categoría**: Obligatorio. Mínimo un carácter.

- **Ubicaciones Comunes**: Obligatorio. Texto separado por "," (por ejemplo: _Isezaki Ijincho,Kamurocho_), convertido internamente a array.

- **Rareza**: Obligatorio. Número entero entre 1 y 5.

- **Habilidades**: Obligatorio. Texto separado por "," (por ejemplo: _Bayoneta Fantasma,Golpear_), convertido internamente a array.

- **Debilidades**: Obligatorio. Texto separado por "," (por ejemplo: _Fuego,Cortante_), convertido internamente a array.

- **Drops**: Obligatorio. Texto separado por "," (por ejemplo: _Piedra Misteriosa,Rubí en Bruto_), convertido internamente a array.

- **Imagen**: Opcional. URL válida.

- **Descripción**: Opcional.

Si se crea correctamente, verás una alerta indicándolo.

![alt text](readme_src/11.png)

<a id="-mostrar-detalles-del-elemento"></a>

### 👁️ Mostrar Detalles del Elemento

Al hacer clic en el **botón de detalles (icono de ojo)** podemos ver en una ventana Modal toda la información del elemento seleccionado con todos sus campos.

**Detalles del Personaje Principal:**

![alt text](readme_src/12.png)

**Detalles de Sujimon:**

![alt text](readme_src/13.png)

<a id="-editar-elemento"></a>

### ✏️ Editar Elemento

Al hacer clic en el **botón editar (icono de lápiz)** podemos editar el elemento seleccionado siguiendo los **campos obligatorios y validaciones** especificados en la sección [➕ Agregar Elemento](#-agregar-elemento).

**Editar Personaje Principal:**

![alt text](readme_src/14.png)

Si pasa la validación, aparecerá un mensaje indicando que se ha editado correctamente:

![alt text](readme_src/15.png)

**Editar Sujimon:**

![alt text](readme_src/16.png)

De manera similar, si todo sale bien, verás un mensaje indicándolo:

![alt text](readme_src/17.png)

<a id="-eliminar-elemento"></a>

### 🚮 Eliminar Elemento

Al hacer clic en el **botón eliminar (icono de papelera)** podemos eliminar un elemento.

Antes de eliminar, te pedirá que confirmes la operación:

![alt text](readme_src/18.png)

Si todo sale bien, el personaje se eliminará de la lista y serás notificado:

![alt text](readme_src/19.png)

<a id="-cambiar-de-lista"></a>

### 🔁 Cambiar de Lista

Al hacer clic en el botón "Cambiar de Lista", podemos alternar entre Personajes Principales y Sujimon

![alt text](readme_src/20.gif)

---

<a id="-puntos-finales-de-la-api"></a>

## 🔌 Puntos Finales de la API

### 📌 Información General

Todos los puntos finales están prefijados con `/api` y devuelven respuestas en formato JSON.

- **URL Base (Local y Docker):** [`http://localhost:3001`](http://localhost:3001)
- **Documentación Swagger:** [`/api-docs`](http://localhost:3001/api-docs)

---

### Personajes Principales

- GET /api/main_characters → Obtener todos
- GET /api/main_characters/{id} → Obtener uno
- POST /api/main_characters → Crear
- PUT /api/main_characters/{id} → Actualizar
- DELETE /api/main_characters/{id} → Eliminar

### Sujimon

- GET /api/sujimon
- GET /api/sujimon/{id}
- POST /api/sujimon
- PUT /api/sujimon/{id}
- DELETE /api/sujimon/{id}

---

### Herramientas

- [Postman](https://www.postman.com/)
- [`curl`](https://curl.se/)
- [Documentación Swagger](http://localhost:3001/api-docs) (integrada en el repositorio y específica de la API, **recomendado**)

---

<a id="-autor"></a>

## 👤 Autor

**Aarón Cano Fernández**  
💻 2º de DAW (Desarrollo de Aplicaciones Web)  
📍 Institut Carles Vallbona (Granollers, Barcelona, España)
