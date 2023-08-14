// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router"; // Importe o roteador aqui

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Use o roteador para montar as rotas
app.use("/", router);

const port = 3334;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});