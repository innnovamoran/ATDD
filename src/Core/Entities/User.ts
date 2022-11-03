import { DataTypes } from "sequelize";

import ORM from "../../Server/Config/DataSource";

const db_instance = new ORM();

export const UserModel = () => {
  const User = db_instance.connection.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
      },
      user_type: {
        type: DataTypes.ENUM,
        values: ["ADMIN", "CLIENT"], // Enum a definición del proyecto a usar
      },
      first_name: {
        type: DataTypes.STRING,
      },
      code_recovery_password: {
        type: DataTypes.INTEGER,
      },
      last_name: { type: DataTypes.STRING },
      phone: { type: DataTypes.INTEGER },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      firebase_token: { type: DataTypes.STRING },
      last_conection: {
        type: "TIMESTAMP",
      },
      active: { type: DataTypes.BOOLEAN },
    },
    {
      tableName: "User",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return User;
};
