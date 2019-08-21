import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ foo: "bar" });
});
export default routes;
