import "reflect-metadata";

import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import cors from "cors";

import ServerExpress from "./Server/index";
import { LOG_ERROR } from "./Core/HandleLogError";

if (!process.env.PORT) {
  process.exit(1);
}

const server = ServerExpress.init_server(Number(process.env.PORT));

server.app.use(morgan("dev"));
server.app.use(cors({ origin: true }));

server.start_server(() => {
  LOG_ERROR({
    function_name: "start_server",
    message: "NODE-EXPRESS ON PORT " + process.env.PORT,
  });
});

process.on("exit", (codigo) => {
  switch (codigo) {
    case 1:
      LOG_ERROR({ function_name: "INIT-SERVER", message: "PORT NOT DEFINED" });
      break;
    // @ts-ignore
    case 95:
      LOG_ERROR({
        function_name: "INIT-SERVER",
        message: "Base de datos no disponible, CrashApp",
      });
    case 600:
      LOG_ERROR({
        function_name: "INIT-SERVER",
        message: "No se pudo conectar a la base de datos",
      });
      break;
    default:
      break;
  }
});
