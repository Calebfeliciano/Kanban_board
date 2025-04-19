import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path'; // ✅ Use path module for cross-platform compatibility

import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const forceDatabaseRefresh = false;
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Use process.cwd() to resolve root directory
const clientDistPath = path.join(process.cwd(), 'client/dist');

// ✅ Serve static frontend files
app.use(express.static(clientDistPath));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ API routes
app.use(routes);

// ✅ Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// 🧪 DB connection diagnostics
console.log("⏳ Attempting DB connection...");

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
