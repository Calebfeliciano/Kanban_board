import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import fs from 'fs';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const forceDatabaseRefresh = false;
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Resolve to correct absolute path for frontend build 
const clientDistPath = path.join(__dirname, 'client');

// 🛠 Temp debug logs for deployment verification
console.log("🛠 process.cwd():", process.cwd());
console.log("🛠 Resolved clientDistPath:", clientDistPath);

// ⚠️ Check for critical build file before server runs
if (!fs.existsSync(path.join(clientDistPath, 'index.html'))) {
  console.warn("⚠️ index.html not found at:", path.join(clientDistPath, 'index.html'));
}

// 🔐 Check for required environment variables
const requiredEnv = ['JWT_SECRET_KEY', 'DB_URL'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
  }
});

// ➡️ Log each incoming request for visibility
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ✅ Serve static frontend files from the build directory
app.use(express.static(clientDistPath));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ API routes
app.use(routes);

// ✅ Health check route for manual uptime checks
app.get('/health', (req, res) => {
  res.status(200).send('✅ Server is healthy');
});

// ✅ Fallback route for React Router (e.g., /login, /edit, etc.)
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

// ❗️ Global error handler for catching unhandled server errors
import type { Request, Response, NextFunction } from 'express';

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Uncaught server error:", err);
  res.status(500).json({ error: "Internal server error" });
});
