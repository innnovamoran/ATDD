"use strict";

module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable("User", {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
      },
      user_type: {
        type: Sequelize.ENUM,
        values: ["ADMIN", "CLIENT"],
      },
      first_name: {
        type: Sequelize.STRING,
      },
      phone: { type: Sequelize.INTEGER },
      last_name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      firebase_token: { type: Sequelize.STRING },
      last_conection: {
        type: "TIMESTAMP",
      },
      active: { type: Sequelize.BOOLEAN },
      code_recovery_password: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable("User");
  },
};
