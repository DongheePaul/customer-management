"use strict";

const routers = [require("../component/member"), require("../component/login")];

const load = (app) => {
  app.get("/hello", (req, res) => {
    console.log("hello");
    res.send("ok");
  });

  //app.use(auth.check);
  //app.use(ratelimit.check);

  for (let i = 0; i < routers.length; i++) {
    app.use("/", routers[i].router);
  }
};

module.exports = { load };
