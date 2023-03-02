const t = async (a) => {
  const c = a.of("/chat");
  a.of("/user"), c.on("connection", (e) => {
    e.on("created", (n) => {
    });
  });
};
export {
  t as default
};
