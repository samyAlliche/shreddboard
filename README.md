# ShreddBoard

ShreddBoard is a sticky note application with a shredding animation, featuring a **React** frontend and a **Node.js** backend. This monorepo contains both the frontend (in the `app/` directory) and the backend (in the `server/` directory).

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- **Create Sticky Notes:** Quickly add, edit, and customize notes with titles, colors, todos, and expiration dates.
- **Shredding Animation:** Delete notes with a fun, animated shredding effect.
- **Automatic Expiration:** Expired notes are automatically shredded.

## Project Structure
```bash
.
├─ app/                  # Frontend (React)
│  ├─ public/
│  ├─ src/
│  │  ├─ components/     # React components
│  │  ├─ styles/         # TailwindCSS, etc.
│  │  └─ main.tsx        # Application entry point
│  ├─ package.json
│  └─ …
├─ server/               # Backend (Node.js, Express)
│  ├─ src/
│  │  ├─ controllers/    # API controllers
│  │  ├─ routes/         # Express routes
│  │  └─ index.ts        # Server entry point
│  ├─ package.json
│  └─ …
├─ .gitignore
├─ README.md
└─ …
```
## Tech Stack

- **Frontend:**  
  - [React](https://reactjs.org/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [TypeScript](https://www.typescriptlang.org/)

- **Backend:**  
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Database: MongoDB or PostgreSQL] (choose based on your setup)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/samyAlliche/shreddboard.git
   cd your-repo
   ```
2.	**Install dependencies for both frontend and backend:**
	•	For the frontend:
  ```bash
  cd app
  npm install
```
  •	For the backend:
```bash
cd ../server
npm install
```
### Running the Project
	
1.	**Start the Backend:**
```bash
cd server
npm run dev
```
The backend server will run on http://localhost:3000 (or your configured port).

2.	**Start the Frontend:**
```bash
cd ../app
npm run dev
```
The React application will run on http://localhost:5173 (or your configured port).

### Environment Variables

Create a .env file in the server/ directory with your environment variables. For example:
```bash
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shreddboard
JWT_SECRET=your_jwt_secret
```
### License

This project is licensed under the MIT License.


Enjoy!
