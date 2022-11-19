import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";

const router = express.Router();

const strategy = new LocalStrategy(function verify(username, password, cb) {
  console.log("verify", username, password);

  const user = {
    id: 1,
    username: "John",
    password: "John",
  };

  // Authentication successful
  return cb(null, user);
});

passport.use(strategy);

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/getCurrentUser", (req, res) => {
  console.log("get user", req.user);
  res.json({ user: req.user, msg: "something" });
});

export default router;
