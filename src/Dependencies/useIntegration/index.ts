import axios, { AxiosRequestHeaders } from "axios";

import { LOG_ERROR } from "../../Core/Schemas/HandleLogError";

/** en algunos casos de comunicacion entre apis es necesario asignar API-KEYS con información encriptada como fechas de expiración */
const getDefaultHeader = ({
  customHeader,
}: {
  customHeader: {};
}): AxiosRequestHeaders => ({
  Authorization: `Api-Key ${process.env.YOUR_ENV}`,
  ...customHeader,
});

export const PostRequest = async (
  URL: string,
  body: Object,
  id: number | string | undefined,
  customHeader: Object
) => {
  try {
    const response = await axios.post(`${URL}${id ? `/${id}` : ""}`, body, {
      headers: getDefaultHeader({ customHeader }),
    });
    /** Esta linea es perfecta para generar log de integraciones */
    return response;
  } catch (error: any) {
    const message = error.response.data.message;
    const status = error.response.data.status_code;
    LOG_ERROR({ function_name: "[AXIOS-PostRequest]", message });
    /** Esta linea es perfecta para generar log de integraciones de errores */
    throw new Error(error);
  }
};

export const PutRequest = async (
  URL: string,
  body: Object,
  id: number | string | undefined,
  customHeader: AxiosRequestHeaders
) =>
  await axios.put(`${URL}${id ? `/${id}` : ""}`, body, {
    headers: getDefaultHeader({ customHeader }),
  });

export const PatchRequest = async (
  URL: string,
  body: Object,
  id: number | string | undefined,
  customHeader: AxiosRequestHeaders
) =>
  await axios.patch(`${URL}${id ? `/${id}` : ""}`, body, {
    headers: getDefaultHeader({ customHeader }),
  });

export const DeleteRequest = async (
  URL: string,
  id: number | string | undefined,
  customHeader: AxiosRequestHeaders
) =>
  await axios.delete(`${URL}/${id}`, {
    headers: getDefaultHeader({ customHeader }),
  });

export const GetRequest = async (
  URL: string,
  id?: number | string | undefined,
  customHeader?: AxiosRequestHeaders
) =>
  await axios.get(`${URL}${id ? `/${id}` : ""}`, {
    headers: getDefaultHeader({
      customHeader: typeof customHeader === "object" ? customHeader : {},
    }),
  });

export const PostMultiPart = async (
  URL: string,
  body: any,
  id: number | string | undefined
) => {
  try {
    const form = new FormData();
    Object.keys(body).forEach((key: string) => {
      form.append(key, body[key]);
    });
    return await axios.post(`${URL}${id ? `/${id}` : ""}`, form, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        Authorization: `Api-Key ${process.env.API_KEY_CLROBOTIC}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
