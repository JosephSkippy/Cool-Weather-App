import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Proxy: weather
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Proxy: geocoding
app.get("/api/geocoding", async (req, res) => {
  const { q } = req.query;
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Proxy: air pollution
app.get("/api/air-pollution", async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Proxy: map tiles
app.get("/api/map-tile/:layer/:z/:x/:y", async (req, res) => {
  const { layer, z, x, y } = req.params;
  const url = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${API_KEY}`;
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  res.set("Content-Type", "image/png");
  res.send(buffer);
});

// Serve static Vite build
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
