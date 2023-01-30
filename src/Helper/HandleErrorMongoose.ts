export type Ierror = {
  message: string;
  key: string;
};

export type ErrorFromMongoose = {
  errors: { [key: string]: { properties: { message: string } } };
};

export type MongooseError = {
  errors: Ierror[];
};

const HandleErrorsMongose = (error: ErrorFromMongoose): Ierror[] => {
  const mensaje: Ierror[] = [];
  for (let key in error.errors) {
    mensaje.push({ message: error.errors[key].properties.message, key });
  }
  return mensaje;
};

export default HandleErrorsMongose;
