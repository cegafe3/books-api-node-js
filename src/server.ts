import "reflect-metadata";
import {createConnection} from "typeorm";
import {Book} from "./services/book/BookEntity";
import * as http from "http"
import * as express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";

createConnection().then(async connection => {
  process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
  });
  
  process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
  });
  
  const router = express();
  applyMiddleware(middleware, router);
  applyRoutes(routes, router);
  applyMiddleware(errorHandlers, router);
  
  const { PORT = 3000 } = process.env;
  const server = http.createServer(router);
  
  server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
  );
}).catch(error => console.log(error));
