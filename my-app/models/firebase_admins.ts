import * as admin from "firebase-admin";

interface Config {
  credentials: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  };
}

export default class FirebaseAdmin {
  public static instance: FirebaseAdmin;

  private init = false;

  public static getInstance(): FirebaseAdmin {
    if (
      FirebaseAdmin.instance === undefined ||
      FirebaseAdmin.instance === null
    ) {
      FirebaseAdmin.instance = new FirebaseAdmin();
    }
    FirebaseAdmin.instance.bootstrap();
    return FirebaseAdmin.instance;
  }

  private bootstrap(): void {
    const haveApp = admin.apps.length !== 0;
    if (haveApp) {
      this.init = true;
      return;
    }

    const config: Config = {
      credentials: {
        projectId: process.env.projectId || "",
        clientEmail: process.env.clientEmail || "",
        privateKey: (process.env.privateKey || "").replace(/\\n/g, "\n"),
      },
    };

    admin.initializeApp({
      credential: admin.credential.cert(config.credentials),
    });
    console.log("bootstrap firebase admin");
  }

  public get Firebase(): FirebaseFirestore.Firestore {
    if (this.init === false) {
      this.bootstrap();
    }

    return admin.firestore();
  }
  public get Auth(): admin.auth.Auth {
    if (this.init === false) {
      this.bootstrap();
    }

    return admin.auth();
  }
}
