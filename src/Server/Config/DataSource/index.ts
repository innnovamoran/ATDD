import { Sequelize } from "sequelize";
import { LOG_ERROR } from "../../../Core/Schemas/HandleLogError";

export default class HandleDataBase {
  private static instance: HandleDataBase;
  connection!: Sequelize;
  constructor() {
    if (!HandleDataBase.instance) {
      HandleDataBase.instance = this;
      return this;
    }
    return HandleDataBase.instance;
  }

  getConfigOptions() {
    return {
      type: process.env.TYPE as string,
      host: process.env.HOST as string,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_MYSQL_USERNAM as string,
      password: process.env.PASSWORD as string,
      database: process.env.DATABASE as string,
    };
  }

  setInstanceDataSoruce(dataSource: Sequelize) {
    this.connection = dataSource;
    return;
  }

  async initDB() {
    try {
      const { database, host, password, port, type, username } =
        this.getConfigOptions();

      const sequelize: Sequelize = new Sequelize(database, username, password, {
        host: host,
        dialect: "mysql",
        port: port,
        retry: {
          max: 10,
        },
      });
      this.setInstanceDataSoruce(sequelize);
      await sequelize.authenticate();
      LOG_ERROR({
        function_name: "[initDB]",
        message: "sequelize init connection to " + database + " db",
      });
    } catch (error: any) {
      LOG_ERROR({ function_name: "[initDB]", message: error.message });
    }
  }
}