"use strict";

module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    return queryInterface.bulkInsert("User", [
      {
        user_type: "ADMIN",
        first_name: "Guillermo",
        last_name: "Morán",
        email: "jgmoran@innovaweb.cl",
        password:
          "$2a$10$O5DbdgsUZYZQc9Cf40FInOajD/eQJrWY7mSblNcNY50/1VDcmP5i.",
        active: true,
      },
      {
        user_type: "ADMIN",
        first_name: "Franco",
        last_name: "Romero",
        email: "fromero@innovaweb.cl",
        password:
          "$2a$10$O5DbdgsUZYZQc9Cf40FInOajD/eQJrWY7mSblNcNY50/1VDcmP5i.",
        active: true,
      },
      {
        user_type: "ADMIN",
        first_name: "Alan",
        last_name: "Guajardo",
        email: "aguajardo@innovaweb.cl",
        password:
          "$2a$10$O5DbdgsUZYZQc9Cf40FInOajD/eQJrWY7mSblNcNY50/1VDcmP5i.",
        active: true,
      },
      {
        user_type: "ADMIN",
        first_name: "David",
        last_name: "Cardenas",
        email: "dcardenas@innovaweb.cl",
        password:
          "$2a$10$O5DbdgsUZYZQc9Cf40FInOajD/eQJrWY7mSblNcNY50/1VDcmP5i.",
        active: true,
      },
    ]);
  },

  async down(queryInterface: any, Sequelize: any) {},
};
