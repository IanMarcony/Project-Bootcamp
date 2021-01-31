import { Router } from "express";

import AuthenticateUserService from "../service/AuthenticateUserService";

const sessionsRouter = Router();
sessionsRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
