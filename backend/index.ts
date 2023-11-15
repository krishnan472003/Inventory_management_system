// index.ts
import express from "express";
import { config } from "dotenv";
import { AuthModule } from "./Authentication/authentication.router";
import { mongodb } from "./db";
import bodyParser from "body-parser";
import cors from  'cors'

config();

const app: express.Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port: number = Number(process.env.PORT);



mongodb();


app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api", AuthModule());



app.listen(port || 5000, () => {
  console.log("Listening on port " + port);
});
