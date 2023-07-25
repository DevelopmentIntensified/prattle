import { getDatabase } from "firebase-admin/database";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import "./init.js";
//const bucket = admin.storage().bucket();
const db = getFirestore();
//const usersref = db.collection("users");
const chatsCollection = db.collection("chats");
const messageCollection = (chatId: string) =>
  chatsCollection.doc(chatId).collection("messages");

const createDocumentWithId = function (
  collection: string,
  doc: string,
  data: FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>
) {
  const docRef = db.collection(collection).doc(doc);
  data.createdAt = Timestamp.now();
  data.updatedAt = Timestamp.now();
  docRef.set(data);
};
const createNewDocument = async (
  collection: string,
  data: FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>
) => {
  data.createdAt = Timestamp.now();
  data.updatedAt = Timestamp.now();
  return await db.collection(collection).add(data);
};
const updateOne = function (
  collection: string,
  doc: string,
  data: { [x: string]: any } & FirebaseFirestore.AddPrefixToKeys<string, any>
) {
  const dRef = db.collection(collection).doc(doc);
  data.updatedAt = Timestamp.now();
  dRef.update(data);
};

async function deleteCollection(collectionPath: string, batchSize: number) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(
  query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
  resolve: (value?: unknown) => void
) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach(
    (doc: { ref: FirebaseFirestore.DocumentReference<any> }) => {
      batch.delete(doc.ref);
    }
  );
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

const getDatabaseTimestamp = async (): Promise<Timestamp> => {
  return Timestamp.now();
};

export {
  createNewDocument,
  createDocumentWithId,
  updateOne,
  chatsCollection,
  messageCollection,
  db,
  deleteCollection,
  getDatabaseTimestamp
  //usersref,
  //bucket,
};
