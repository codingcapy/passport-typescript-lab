import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import passportMiddleware from './middleware/passportMiddleware';
import "./types/index"
import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";

const port = process.env.port || 8000;
const app = express();
const memStore = new session.MemoryStore()

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { //🍪
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: memStore
  })
);

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log((req.session as any).passport);
  next();
});

app.post('/revokesession/:session', (req, res) => {
  const sessionId = req.params.session;
  const sesssions = Object.keys((req as any).sessionStore.sessions)
  sesssions.map((session) => {
    if (session === sessionId) {
      memStore.destroy(req.params.session)
    }
  })
  res.redirect('/dashboard');
});


app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
