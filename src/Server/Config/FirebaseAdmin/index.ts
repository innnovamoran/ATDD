import admin from "firebase-admin";
import { FirebaseDynamicLinks } from "firebase-dynamic-links";
/** JSON de credenciales proyecto firebase */
// import serviceAccount from "../../../../your_credential_config.json";
/** Archivo de configuración requerido para funcionalidades de FIREBASE como DynamicLinks y Notificaciones PUSH */
import { FirebaseConfig } from "../FIrebaseConfig";
/** modulo para track de logs */
import { LOG_ERROR } from "../../../Core/Schemas/HandleLogError";
export default class HandleFirebaseAdmin {
  private static instance: HandleFirebaseAdmin;
  firebaseAdmin!: admin.app.App;
  dynamicLinkAdmin!: FirebaseDynamicLinks;
  constructor() {
    if (!HandleFirebaseAdmin.instance) {
      HandleFirebaseAdmin.instance = this;
      return this;
    }
    return HandleFirebaseAdmin.instance;
  }

  initFCM() {
    try {
      this.firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: "",
          privateKey: "",
          projectId: "",
        }),
      });

      this.dynamicLinkAdmin = new FirebaseDynamicLinks(FirebaseConfig.apiKey);
    } catch (error: any) {
      LOG_ERROR({
        function_name: "[INIT-FIREBASE-ERROR]",
        message: error.message,
      });
    }
  }
}
