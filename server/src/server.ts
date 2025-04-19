import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';

import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const forceDatabaseRefresh = false;
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve static files from the frontend build
app.use(express.static(path.resolve('client/dist')));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ API routes
app.use(routes);

// ✅ Fallback route to support React Router
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/dist', 'index.html'));
});

// 🧪 Diagnostic log for DB connection
console.log("⏳ Attempting DB connection...");

// ✅ Start server after DB sync
sequelize.sync({ force: forceDatabaseRefresh })
  .then(() => {
    console.log("✅ DB connected. Starting server...");
    app.listen(PORT, () => {
      console.log(`✅ Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
