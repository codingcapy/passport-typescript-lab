import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  const sessions = Object.keys((req as any).sessionStore.sessions).map((key) => JSON.parse((req as any).sessionStore.sessions[key]));
  res.render("dashboard", { user: req.user, sessions: sessions });
});

//testing sessions display
router.get('/sessions', (req, res) => {
  const sessions = Object.keys((req as any).sessionStore.sessions).map((key) => JSON.parse((req as any).sessionStore.sessions[key]));
  res.send(sessions);
});

router.get('/killsession/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId as string;
  const sessionStore = req.sessionStore as any;

  if (sessionStore.sessions && sessionStore.sessions[sessionId]) {
    delete sessionStore.sessions[sessionId];
    res.send('Session killed successfully.');
  } else {
    res.send('Session not found.');
  }
});

export default router;
