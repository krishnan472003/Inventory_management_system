// index.ts
import express from "express";
import { config } from "dotenv";
import { mongodb } from "./db";
import bodyParser from "body-parser";
import {UserModule} from './User/user.router'
import cors from  'cors'
import cookieParser from 'cookie-parser'
config();

const app: express.Application = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json())

const port: number = Number(process.env.PORT);
mongodb();

app.use("/api", UserModule());



app.listen(port || 5000, () => {
  console.log("Listening on port " + port);
});
