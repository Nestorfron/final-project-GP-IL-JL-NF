import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyASCpveXH9Yrp21A5YB56bxIr0iQEVDduc",
  authDomain: "fir-auth-yt-e7836.firebaseapp.com",
  projectId: "fir-auth-yt-e7836",
  storageBucket: "fir-auth-yt-e7836.appspot.com",
  messagingSenderId: "807146426135",
  appId: "1:807146426135:web:12f0b3b675e442ee7ff152",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const storafeRef = ref(storage, v4());
  await uploadBytes(storafeRef, file);
  const url = await getDownloadURL(storafeRef);
  return url;
}
