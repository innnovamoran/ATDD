import HandleFirebaseAdmin from "../../Server/Config/FirebaseAdmin";
const fcm = new HandleFirebaseAdmin();

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};
type params = {
  token: string;
  message: string;
};
export const sendPushNotification = async ({
  token,
  message,
}: params): Promise<void> => {
  try {
    if (!token || token === null) {
      return;
    }
    await fcm.firebaseAdmin.messaging().sendToDevice(
      token,
      {
        notification: {
          title: message,
          body: "",
          sound: "default",
        },
      },
      notification_options
    );
    return;
  } catch (error: any) {
    throw new Error(error);
  }
};
