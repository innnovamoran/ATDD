import { connect, connection, set } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = MongoMemoryServer.create();

export default class MongooseDB {
  private static instance: MongooseDB | undefined;

  constructor() {
    if (MongooseDB.instance) {
      return MongooseDB.instance;
    }
    MongooseDB.instance = this;
    return this;
  }

  start_connection_db = async () => {
    try {
      await connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`, {
        appName: "shoping_car_graphql",
      });
      console.log("[DB-CONNECT-START]");
    } catch (error) {
      console.log("[DB-CONNET-ERROR]");
      console.error(error);
    }
  };

  start_mock_db = async () => {
    set("strictQuery", false);
    await connect((await mongod).getUri(), { maxPoolSize: 10 });
  };

  end_mock_db = async () => {
    await connection.dropDatabase();
    await connection.close();
    (await mongod).stop();
  };
}
