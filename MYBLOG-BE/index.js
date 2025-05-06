
import bodyParser from 'body-parser';
import express from 'express';
import sequelize from './utils/db.js';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from "cors";
import {router} from './controllers/posts.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
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
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
