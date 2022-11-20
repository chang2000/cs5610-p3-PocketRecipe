import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";

import session from "express-session";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
      secret: "Pocket Recipe passport local",
      resave: false,
      saveUninitialized: true,
    })
  );

app.use("/", indexRouter);
app.use("/", authRouter);

export default app;