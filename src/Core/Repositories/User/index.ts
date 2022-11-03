import { Op, Order, OrderItem } from "sequelize";
import { UserModel } from "../../Entities/User";

const SelectUsers = [
  "id",
  "first_name",
  "last_name",
  "email",
  "phone",
  "active",
  "firebase_token",
  "last_conection",
  "user_type",
];
const SelectUsersWithPass = ["password"];

const DefaultOrder = ["id", "DESC"];

const handleSearch = ({ search }: { search: Object }) => ({
  [Op.substring]: search,
});

const SearchByOrWithModel = ({ search }: { search: Object }) => [
  {
    first_name: handleSearch({ search }),
  },
  {
    last_name: handleSearch({ search }),
  },
  {
    email: handleSearch({ search }),
  },
  {
    phone: handleSearch({ search }),
  },
  {
    firebase_token: handleSearch({ search }),
  },
  {
    last_conection: handleSearch({ search }),
  },
  {
    user_type: handleSearch({ search }),
  },
];

export const getForLogin = async (query: Object) => {
  const found: any = await UserModel().findOne({
    attributes: [...SelectUsers, ...SelectUsersWithPass],
    where: {
      ...query,
    },
  });

  return found ? found.dataValues : null;
};

export const get = async (query: Object) => {
  const found: any = await UserModel().findOne({
    attributes: SelectUsers,
    where: {
      ...query,
    },
  });
  return found ? found.dataValues : null;
};

export const getAll = async () => {
  const found = await UserModel().findAll({ attributes: SelectUsers });
  return found ? found.map((item: any) => item.dataValues) : [];
};

export const getAllWithLike = async (search: Object) => {
  const found = await UserModel().findAll({
    attributes: SelectUsers,
    where: {
      [Op.or]: SearchByOrWithModel({ search }),
    },
  });
  return found ? found.map((item: any) => item.dataValues) : [];
};

export const getAllClients = async () => {
  const found = await UserModel().findAll({
    attributes: SelectUsers,
    where: {
      user_type: "CLIENT",
    },
    order: [DefaultOrder as OrderItem],
  });
  return found ? found.map((item: any) => item.dataValues) : [];
};

export const getAllAdmins = async () => {
  const found = await UserModel().findAll({
    attributes: SelectUsers,
    where: {
      user_type: "ADMIN",
    },
    order: [DefaultOrder as OrderItem],
  });
  return found ? found.map((item: any) => item.dataValues) : [];
};

export const create = async (payload: Object) =>
  await UserModel().create({ ...payload, active: true });

export const update = async (id: number, payload: Object) => {
  await UserModel().update(payload, { where: { id } });
  return await get({ id });
};

export const deleteUser = async (id: number) =>
  await UserModel().destroy({ where: { id } });

export const active = async (id: number) => {
  const user = await get({ id });
  return await update(id, { active: !user.active });
};

export const setCodeRecoveryPassword = async ({
  id,
  code_recovery_password,
}: {
  id: number;
  code_recovery_password: number;
}) => {
  return await update(id, { code_recovery_password });
};
