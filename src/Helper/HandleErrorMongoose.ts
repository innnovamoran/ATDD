export type Ierrors = {
  message: string;
  key: string;
};

export type ErrorFromMongoose = {
  errors: { [key: string]: { properties: { message: string } } };
};

const HandleErrorsMongose = (error: ErrorFromMongoose): Ierrors[] => {
  const mensaje: Ierrors[] = [];
  for (let key in error.errors) {
    mensaje.push({ message: error.errors[key].properties.message, key });
  }
  return mensaje;
};

export default HandleErrorsMongose;
