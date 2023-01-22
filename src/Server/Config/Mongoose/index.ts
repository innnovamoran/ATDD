import { connect } from "mongoose";

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
}
