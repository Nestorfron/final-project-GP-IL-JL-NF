import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFile(file) {
  const storafeRef = ref(storage, v4());
  await uploadBytes(storafeRef, file);
  const url = await getDownloadURL(storafeRef);
  return url;
}

export const db = getFirestore(app);
