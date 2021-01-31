import "reflect-metadata";
import express, { json } from "express";
import routes from "./routes";
import "./database";

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () =>
  console.log("🚀 Server rodando! Acesse: http://localhost:3333/"),
);
