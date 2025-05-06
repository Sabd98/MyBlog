
import bodyParser from 'body-parser';
import express from 'express';
import sequelize from './utils/db.js';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from "cors";
import {router} from './controllers/posts.js';
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use the Railway Volume path (/uploads)
const UPLOAD_DIR = "/uploads";

// Ensure the directory exists on startup
await fs.mkdir(UPLOAD_DIR, { recursive: true });


app.use("/uploads", express.static(UPLOAD_DIR));
const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); 

app.use(router);

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Not found' });
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
