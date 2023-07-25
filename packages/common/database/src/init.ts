import { initializeApp, cert, App } from "firebase-admin/app";

export const initializeDatabase = function (
  key: string,
  databaseURL: string,
  options: Record<string, unknown>
): App {
  return initializeApp({
    credential: cert(JSON.parse(key)),
    databaseURL: databaseURL,
    ...options
  });
};

/*
{
  credential: cert(JSON.parse(globalVariables.FIREBASE_KEY)),
  databaseURL: "https://bible-quiz-e1ef4.firebaseio.com",
  storageBucket: "bible-quiz-e1ef4.appspot.com"
}
*/
