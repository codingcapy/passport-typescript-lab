import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

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
  res.send(sessions);
});

router.post('/revokesession/:session', (req, res) => {
  const sessionId = req.params.session as string;
  const sessions = Object.keys((req as any).sessionStore.sessions)
  sessions.map((key) => {
    if (key === sessionId) {
      Object((req as any).sessionStore.sessions).container[key].destroy((err: any) => {
        if (err) {
          res.send('Error revoking session.');
        } else {
          res.redirect('/dashboard');
        }
      })
    }
  })
});

export default router;
