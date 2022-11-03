import bcrypt from "bcryptjs";

export const hashPassword = async (password: string, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const comparePassword = (password: string, hashPassword: string) => {
  try {
    return bcrypt.compareSync(password, hashPassword);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const generateRandomCode = () =>
  Math.floor(100000 + Math.random() * 900000);
