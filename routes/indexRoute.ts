import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { Request, Response } from "express";
import { Session } from "express-session"

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  // const sessions = Object.keys((req as any).sessionStore.sessions).map((key) => JSON.parse((req as any).sessionStore.sessions[key]));
  // const sessions = Object.values((req as any).sessionStore.sessions).map((session: any) => {
  //     const parsedSession = JSON.parse(session);
  //     return { id: parsedSession.id, data: parsedSession };
  // });
  const sessions = Object.keys((req as any).sessionStore.sessions)
  res.render("dashboard", { user: req.user, sessions: sessions });
});

//testing sessions display
router.get('/sessions', (req, res) => {
  const sessions = Object.keys((req as any).sessionStore.sessions)
  const sessions2 = Object.values((req as any).sessionStore.sessions)
  const sessions3 = Object((req as any).sessionStore.sessions)
  res.send(sessions3);
});

interface CustomSessionData {
  [key: string]: any; // Customize the value type if necessary
}

interface CustomRequest extends Request {
  session: Session & Partial<CustomSessionData>; // Use the imported Session type
}

export default router;
