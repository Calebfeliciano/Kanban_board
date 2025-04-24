# Kanban Board

![License](https://img.shields.io/badge/License-MIT-blue.svg)

## 🚀 Description

A full-stack **Kanban board application** built with **React, TypeScript, Node.js, MongoDB**, and optionally **PostgreSQL**. This application allows users to:

- Log in with secure JWT authentication
- Create and manage tasks as "tickets"
- Drag and drop tickets across customizable swimlanes for task tracking
- Use a fully responsive UI
- Interact with a protected backend API

> ✅ Fully deployed on Render: [Kanban Board Live Site](https://kanban-board-4yeh.onrender.com)

---

## 📁 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

---

## 🛠️ How to Run Locally

1. **Clone the repository**
    ```bash
    git clone https://github.com/Calebfeliciano/Kanban_board
    cd Kanban_board
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**
    - Copy `.envexample` to `.env` inside the `/server` directory:
      ```bash
      cp server/.envexample server/.env
      ```
    - Fill in your local PostgreSQL credentials and JWT secret in `.env`:
      ```env
      DB_NAME=kanban_db
      DB_USER=your_postgres_user
      DB_PASSWORD=your_postgres_password
      DB_HOST=localhost
      DB_PORT=5432
      JWT_SECRET_KEY=your_secret_key
      ```

4. **Create the local database**
    - Open a PostgreSQL client (like DBeaver or psql) and run:
      ```sql
      CREATE DATABASE kanban_db;
      ```

5. **Seed the database**
    ```bash
    npm run seed
    ```

6. **Start the application**
    ```bash
    npm run start
    ```

7. **Access the app**
    - Open your browser and go to [http://localhost:3000](http://localhost:3000)

---

## 💡 Usage

1. Log in using demo credentials:
   - **Username:** `JollyGuru`
   - **Password:** `123456`

2. Add and assign tasks to users.
3. Move tasks between swimlanes (e.g., To Do → In Progress → Done).
4. Click on a ticket to edit or delete.

To contribute:

1. Fork the repository
2. Create a feature branch
    ```bash
    git checkout -b feature/your-feature
    ```
3. Commit and push your changes
4. Open a pull request

Follow coding conventions, test your changes, and keep commits clean.

---

## 🧪 Tests

There is no test suite currently included. However, you can add tests using:

- **Backend:** [Jest](https://jestjs.io/)
- **Frontend:** [React Testing Library](https://testing-library.com/)

---

## 📜 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Ensure your code follows established style guidelines and is well-documented.

---

## ❓ Questions

If you have any questions or feedback, feel free to contact me:

- GitHub: [@Calebfeliciano](https://github.com/Calebfeliciano)
- Email: [caleb.feliciano11@gmail.com](mailto:caleb.feliciano11@gmail.com)
- Deployed Site: (https://kanban-board-4yeh.onrender.com)

---

## 📄 .envexample

```env
# Local PostgreSQL setup
DB_NAME=kanban_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432

# JWT secret
JWT_SECRET_KEY=devSecretKey123
```

