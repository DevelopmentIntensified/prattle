import { CollectionReference } from "firebase-admin/firestore";

const getPureData = (obj: Record<string, unknown>): object => {
  const data: Record<string, unknown> = {};
  for (const j in obj) {
    if (!j.includes("_C_") && !j.includes("_D_")) {
      data[j] = obj[j];
    }
  }
  return data;
};

const dataMiner = async (
  obj: Record<string, Record<string, unknown>>,
  collection: CollectionReference
) => {
  for (const i in obj) {
    const data: Record<string, unknown> = {};
    if (!(typeof obj[i] === "object")) continue;
    for (const j in obj[i]) {
      if (!j.includes("_C_") && !j.includes("_D_")) {
        data[j] = obj[i][j];
      } else if (j.includes("_C_")) {
        await dataMiner(
          obj[i][j] as Record<string, Record<string, unknown>>,
          collection.doc(i).collection(j.replace("_C_", ""))
        );
      } else if (j.includes("_D_")) {
        await dataMiner(
          obj[i][j] as Record<string, Record<string, unknown>>,
          collection.doc(i).collection(j.replace("_D_", ""))
        );
      }
    }
    await collection.doc(i.replace("_D_", "").replace("_C_", "")).set(data);
  }
};

export { dataMiner, getPureData };
