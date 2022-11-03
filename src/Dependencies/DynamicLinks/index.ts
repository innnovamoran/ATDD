import HandleFirebaseAdmin from "../../Server/Config/FirebaseAdmin";
const fcm = new HandleFirebaseAdmin();

import { LOG_ERROR } from "../../Core/Schemas/HandleLogError";

export const generateLink = async (params: string) => {
  try {
    const query = params ? params : "";
    const { shortLink, previewLink } = await fcm.dynamicLinkAdmin.createLink({
      dynamicLinkInfo: {
        domainUriPrefix: "https://app.page.link",
        link: process.env.HOST_DL + query,
        androidInfo: {
          androidPackageName: "com-android-app",
        },
        iosInfo: {
          iosBundleId: "ios-bundle-id",
        },
      },
    });
    return { shortLink, previewLink };
  } catch (error: any) {
    LOG_ERROR({
      function_name: "[generateLink]",
      message: error.message,
    });
    throw new Error(error);
  }
};
