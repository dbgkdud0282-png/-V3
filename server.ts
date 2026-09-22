import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const DATA_FILE = path.join(process.cwd(), 'server-data.json');

function getStoredData() {
  const possiblePaths = [
    DATA_FILE,
    path.join(process.cwd(), 'public', 'server-data.json'),
    path.join(process.cwd(), 'dist', 'server-data.json'),
  ];
  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf-8');
        const parsed = JSON.parse(content);
        if (parsed && (parsed.parcels || parsed.config || parsed.parcels26)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(`Error reading server data from ${p}:`, e);
    }
  }
  return null;
}

function saveStoredData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    const publicFile = path.join(process.cwd(), 'public', 'server-data.json');
    if (fs.existsSync(path.dirname(publicFile))) {
      fs.writeFileSync(publicFile, JSON.stringify(data, null, 2), 'utf-8');
    }
    const distFile = path.join(process.cwd(), 'dist', 'server-data.json');
    if (fs.existsSync(path.dirname(distFile))) {
      fs.writeFileSync(distFile, JSON.stringify(data, null, 2), 'utf-8');
    }
    return true;
  } catch (e) {
    console.error("Error saving server data", e);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/data", (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const data = getStoredData();
    if (data) {
      res.json({ success: true, data });
    } else {
      res.json({ success: false, message: "No server data found" });
    }
  });

  app.get("/server-data.json", (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Type', 'application/json');
    const data = getStoredData();
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "No server data found" });
    }
  });

  app.post("/api/data", (req, res) => {
    const success = saveStoredData(req.body);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to save data" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

