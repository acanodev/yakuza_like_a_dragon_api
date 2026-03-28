# 🐉 Yakuza Like a Dragon API

<a id="-index"></a>

## 📑 Index

- [🎯 Project Objective](#-project-objective)
- [🛠️ Tech stack (Technologies Used)](#️-tech-stack-technologies-used)
- [📁 Project Structure](#-project-structure)
- [👀 Prerequisites](#-prerequisites)
- [⚙️ Installation (Local)](#️-installation-local)
- [🐳 Installation (Docker)](#-installation-docker)
- [⏩ Features](#-features)
  - [➕ Add Element](#-add-element)
  - [👁️ Show Element Details](#-show-element-details)
  - [✏️ Edit Element](#-edit-element)
  - [🚮 Delete Element](#-delete-element)
  - [🔁 Switch List](#-switch-list)
- [🔌 API Endpoints](#-api-endpoints)
- [👤 Author](#-author)

---

<a id="-project-objective"></a>

## 🎯 Project Objective

The objective of this project is to create a full-stack application using the **MERN Stack** (MongoDB, Express, React, Node.js).

The application must perform **various CRUD operations** (Create, Read, Update, Delete) through a RESTful API and provide an intuitive frontend to perform them.

The application must have the following features:

- List elements
- Create elements
- Edit elements
- Delete elements
- Show element details
- Manage database with MongoDB

---

<a id="️-tech-stack-technologies-used"></a>

## 🛠️ Tech stack (Technologies Used)

- **Runtime:** Node.js
- **Backend (RESTful API):** Express.js
- **Database:** MongoDB
- **Error Handling:** Custom Middleware
- **CORS:** Configuration for cross-origin requests
- **API-DOCS**: Swagger
- **Frontend:** React (TypeScript)
- **Styles:** CSS + Bootstrap
- **Icons:** Font Awesome
- **Fonts Used:** [Edo SZ](https://www.dafont.com/edo-sz.font?text=Mysterious+Hitman), [Noto Sans Display](https://fonts.google.com/download/next-steps?categoryFilters=Feeling:%2FExpressive%2FBusiness)
- **Form Management:** React Hook Form
- **Validations:** Zod (frontend), Mongoose + custom validators (backend)
- **Asynchronous Requests:** Axios
- **Container:** Docker
- **Docker Images:** [Node:22 Alpine](https://hub.docker.com/layers/library/node/22-alpine/images/sha256-3a4802e64ab5181c7870d6ddd8c824c2efc42873baae37d1971451668659483b), [Nginx:1.29.6 Alpine](https://hub.docker.com/_/nginx/) and [MongoDB 8.0](https://hub.docker.com/_/mongo)

---

<a id="-project-structure"></a>

## 📁 Project Structure

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

**Note**: The project repository is missing directories such as `node_modules`, which are essential for the application to function. Later, following the installation steps, they can be restored.

---

<a id="-prerequisites"></a>

## 👀 Prerequisites

- **[Node JS 22.21.1](https://nodejs.org/en/download)**
- **[Git](https://git-scm.com/install/)**
- **[Docker Engine (if you want to use it from a container)](https://docs.docker.com/engine/install/)**
- **[MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator)**

**Note 1**: It is possible that if you work from a Linux distribution you already have Git installed, you can check it with the following command:

```bash
git --version
```

The output should be similar to the following:

```bash
git version 2.43.0
```

**Note 2**: To speed up the preparation of MongoDB and the database if you want to install and use it locally, the project has a `mongodb` directory with a `.env.example` file and `compose.yaml` to launch a Docker container with MongoDB without any extra configuration. To do this, follow the **following steps:**

**Step 1:** Once you have the repository cloned (see [the first step of **⚙️ Installation (Local)**](#️-installation-local) to know how to do it), starting from the project root, navigate to the `mongodb` directory:

```bash
cd mongodb
```

**Step 2:** Check that you have port **27017** available:

```bash
aaroncanofdez@aaron-cano-disk:~$ ss -punta | grep 27017
Netid State      Recv-Q Send-Q        Local Address:Port     Peer Address:Port  Process
tcp   ESTAB     0      0                172.23.0.1:39594     172.23.0.2:27017
tcp   ESTAB     0      0                172.23.0.1:39600     172.23.0.2:27017
```

If `Local Address:Port` does not show:

```bash
127.0.0.1:27017
```

The port is available and you don't need to configure anything else, as Docker Compose will automatically use port 27017 when creating the MongoDB container. If it does show, you'll need to make a copy of `.env.example` to create a `.env` file and specify an available port:

```bash
cp .env.example .env
```

```env
MONGO_PORT=(PORT YOU HAVE AVAILABLE or leave empty to use 27017)
```

Now you just need to start the container:

```bash
docker compose up --build -d
```

And you'll see that it's active:

```bash
docker ps
```

```bash
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                    PORTS                                             NAMES
65572c0afa94   mongo:8.0             "docker-entrypoint.s…"   10 seconds ago   Up 10 seconds             0.0.0.0:27017->27017/tcp, [::]:27017->27017/tcp   yakuza_like_a_dragon_mongo
```

---

<a id="️-installation-local"></a>

## ⚙️ Installation (Local)

### 1. Clone the Repository

```bash
git clone https://github.com/aaroncano2006/yakuza_like_a_dragon_api.git
```

Or with SSH key:

```bash
git clone git@github.com:aaroncano2006/yakuza_like_a_dragon_api.git
```

### 2. Install Backend Dependencies

```bash
cd yakuza_like_a_dragon_api
npm install
```

### 3. Configure Environment Variables (Backend)

Copy the `.env.example` file with the name `.env`

```env
cp .env.example .env
```

Fill in the environment variables for local execution:

```env
MONGODB_URI=mongodb://localhost:(MongoDB port, default: 27017)/db
CORS_ORIGIN=http://localhost:3001
HOST=http://localhost
PORT=3001
```

### 4. Install Frontend Dependencies

Navigate to the `frontend` directory

```bash
cd ../frontend
npm install
```

### 5. Run Seeder (Optional)

The project has test data to test the frontend functionality. To load it, simply run the following command:

```bash
cd ../yakuza_like_a_dragon_api
npm run seed
```

**Note:** To avoid duplication or further errors, seeders will only work if the database is empty.

### 6. Run the Application

In one terminal, from the `yakuza_like_a_dragon_api/` folder:

```bash
npm run dev
```

In another terminal, from the `frontend/` folder:

```bash
npm run dev
```

Access the URL provided by Vite output (usually [`http://localhost:5173`](http://localhost:5173)):

```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

![alt text](readme_src/01.png)

If you access [`localhost:3001`](http://localhost:3001) you will see a detailed healthcheck about the API and at [`localhost:3001/api-docs`](http://localhost:3001/api-docs) to consult the API documentation and try the endpoints:

![alt text](readme_src/02.png)

![alt text](readme_src/03.png)

---

<a id="-installation-docker"></a>

## 🐳 Installation (Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/aaroncano2006/yakuza_like_a_dragon_api.git
```

Or with SSH key:

```bash
git clone git@github.com:aaroncano2006/yakuza_like_a_dragon_api.git
```

### 2. Configure Environment Variables (Backend)

Navigate to `yakuza_like_a_dragon_api`:

```bash
cd yakuza_like_a_dragon_api
```

Copy the `.env.example` file with the name `.env`

```env
cp .env.example .env
```

Fill in the environment variables for Docker execution:

```env
# FOR DOCKER
MONGODB_URI=mongodb://mongo:27017/yakuza_like_a_dragon_api
CORS_ORIGIN=http://localhost:3001
HOST=http://localhost
PORT=3001
```

It is important that the MongoDB host is as indicated above, so that the API can recognize the container within the Docker network and make requests. Using `localhost` and the port that the local MongoDB points to will result in an error.

### 3. Create `.env` at the Project Root

Navigate to the project root:

```bash
cd ..
```

Copy the `.env.example` file with the name `.env` and fill in the environment variable with the port on your machine that will be used

```bash
cp .env.example .env
```

```env
MONGO_PORT=27017 # (Can be another available port, or leave it empty to use 27017 by default)
```

### 4. Run Docker Compose

```bash
docker compose up --build -d
```

This will bring up 3 containers:

- MongoDB 8.0
- API (on Node 22 Alpine)
- Frontend (on Nginx)

Access the frontend from [`localhost:8080`](http://localhost:8080):

![alt text](readme_src/04.png)

**Note:** When running the application with Docker, seeders with test data are automatically executed. You don't need to run them manually as opposed to the local installation.

Access [`localhost:3001`](http://localhost:3001) to see the healthcheck and [`localhost:3001/api-docs`](http://localhost:3001/api-docs) to consult the API documentation and try the endpoints:

![alt text](readme_src/05.png)

![alt text](readme_src/06.png)

---

<a id="-features"></a>

## ⏩ Features

<a id="-add-element"></a>

### ➕ Add Element

By clicking the **Add Main Character** or **Add Sujimon** button, we open a Modal window with the creation form:

![alt text](readme_src/07.png)

![alt text](readme_src/08.png)

The mandatory fields and validations for Main Character are as follows:

- **Name**: Mandatory. Minimum one character, cannot be empty.

- **Date of Birth**: Optional. Valid date format (for example: dd/mm/YYYY).

- **Jobs**: Optional. Text separated by "," (example: _Hero,Freelancer_), internally converted to array.

- **Image**: Optional. Valid URL.

- **Description**: Optional.

- **Is Playable**: Check the checkbox depending on whether the character is playable or not. If you don't check it, the application will save the character as non-playable.

If created correctly, you will see an alert indicating so.

![alt text](readme_src/09.png)

![alt text](readme_src/10.png)

The mandatory fields and validations for Sujimon are as follows:

- **Name**: Mandatory. Minimum one character, cannot be empty.

- **ID**: Mandatory. Numeric ID that corresponds to its entry in the Sujidex of the Yakuza Like a Dragon video game.

- **Category**: Mandatory. Minimum one character.

- **Common Locations**: Mandatory. Text separated by "," (for example: _Isezaki Ijincho,Kamurocho_), internally converted to array.

- **Rarity**: Mandatory. Integer number between 1 and 5.

- **Abilities**: Mandatory. Text separated by "," (for example: _Ghost Bayonet,Hit_), internally converted to array.

- **Weaknesses**: Mandatory. Text separated by "," (for example: _Fire,Slashing_), internally converted to array.

- **Drops**: Mandatory. Text separated by "," (for example: _Mysterious Stone,Raw Ruby_), internally converted to array.

- **Image**: Optional. Valid URL.

- **Description**: Optional.

If created correctly, you will see an alert indicating so.

![alt text](readme_src/11.png)

<a id="-show-element-details"></a>

### 👁️ Show Element Details

By clicking the **detail button (eye icon)** we can view in a Modal window all the information of the selected element with all its fields.

**Main Character Details:**

![alt text](readme_src/12.png)

**Sujimon Details:**

![alt text](readme_src/13.png)

<a id="-edit-element"></a>

### ✏️ Edit Element

By clicking the **edit button (pencil icon)** we can edit the selected element following the **mandatory fields and validations** specified in the section [➕ Add Element](#-add-element).

**Edit Main Character:**

![alt text](readme_src/14.png)

If it passes validation, a message will appear indicating that it has been edited correctly:

![alt text](readme_src/15.png)

**Edit Sujimon:**

![alt text](readme_src/16.png)

Similarly, if everything goes well, you will see a message indicating so:

![alt text](readme_src/17.png)

<a id="-delete-element"></a>

### 🚮 Delete Element

By clicking the **delete button (trash icon)** we can delete an element.

Before deleting, it will ask you to confirm the operation:

![alt text](readme_src/18.png)

If everything goes well, the character will be deleted from the list and you will be notified:

![alt text](readme_src/19.png)

<a id="-switch-list"></a>

### 🔁 Switch List

By clicking the "Switch List" button, we can alternate between Main Characters and Sujimon

![alt text](readme_src/20.gif)

---

<a id="-api-endpoints"></a>

## 🔌 API Endpoints

### 📌 General Information

All endpoints are prefixed with `/api` and return responses in JSON format.

- **Base URL (Local and Docker):** [`http://localhost:3001`](http://localhost:3001)
- **Swagger Documentation:** [`/api-docs`](http://localhost:3001/api-docs)

---

### Main Characters

- GET /api/main_characters → Get all
- GET /api/main_characters/{id} → Get one
- POST /api/main_characters → Create
- PUT /api/main_characters/{id} → Update
- DELETE /api/main_characters/{id} → Delete

### Sujimon

- GET /api/sujimon
- GET /api/sujimon/{id}
- POST /api/sujimon
- PUT /api/sujimon/{id}
- DELETE /api/sujimon/{id}

---

### Tools

- [Postman](https://www.postman.com/)
- [`curl`](https://curl.se/)
- [Swagger Documentation](http://localhost:3001/api-docs) (integrated into the repository and specific to the API, **recommended**)

---

<a id="-author"></a>

## 👤 Author

**Aarón Cano Fernández**  
💻 2nd Year of DAW (Web Application Development)  
📍 Institut Carles Vallbona (Granollers, Barcelona, Spain)
