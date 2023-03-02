export const serialize = (obj: object) => {
  return JSON.stringify(obj, (_key, value) => {
    if (value instanceof Set) {
      return [...value /*, "isSet:true"*/];
    } else if (value instanceof Map) {
      return { ...Object.fromEntries(value) /*, isMap: true*/ };
    } else {
      return value;
    }
  });
};

// export const deserialize = (obj: string): object => {
//   return JSON.parse(obj, function (_key, value) {
//     // if (value instanceof Set) {
//     //   return [...value, "isSet:true"];
//     // } else if (value instanceof Map) {
//     //   return { ...Object.fromEntries(value), isMap: true };
//     // } else {
//     //   return value;
//     // }
//     if (typeof value === "object") {
//       console.log(_key, value);
//       if (Array.isArray(value) && value.includes("isSet:true")) {
//         value = new Set(value.filter((v) => v !== "isSet:true"));
//       } else if (value.isMap) {
//         value = new Map(Object.entries(this).filter((v) => v[0] !== "isMap"));
//       }
//     }
//     return value;
//   });
// };

// console.log(
//   deserialize(
//     serialize(
//       new Chat({
//         name: "hi",
//         creator: "hi",
//         id: "hi",
//         users: ["heyther", "hi"]
//       })
//     )
//   )
// );
