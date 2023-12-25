import { Request, Response, Application } from "express";
import { router as memberRouter } from "../component/member";
import { router as loginRouter } from "../component/login";
import { router as postRouter } from "../component/post";

//const routers = [member, login, post];

const load = (app: Application) => {
  app.get("/hello", (req: Request, res: Response) => {
    console.log("hello");
    res.send("ok");
  });
  //app.use(auth.check);
  //app.use(ratelimit.check);
  // for (let i = 0; i < routers.length; i++) {
  //   app.use("/", routers[i].router);
  // }
  app.use("/", memberRouter);
  app.use("/", loginRouter);
  app.use("/", postRouter);
};

export { load };
