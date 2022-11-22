import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import db from "../db/db.js";

const router = express.Router();

const strategy = new LocalStrategy(async function verify(username, password, cb) {
  console.log("verify", username, password);
  // let user = {
  //   email: username,
  //   password: password
  // };
  // console.log("userrrrrr: ", user);
  // try {
  //   let res = await db.userLogin(user)
  //   console.log("res here", res)
  //   res.send({
  //     val: 1,
  //     comment: "Successfully logged in"
  //   })
  // } catch (error) {
  //   console.log("Error", error);
  //   res.status(200).send({ val: -1, err: error });
  // }

  const user = {
    id: 1,
    username: "Johns",
    password: "John",
  };


  // Authentication successful
  return cb(null, user);
});

passport.use(strategy);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});


router.post(
  "/login/password",
  passport.authenticate('local',
    { failureRedirect: '/login', failureMessage: true }),
  function (req, res) {
    console.log("herrrrrrrrrr name of user:", req.user.username)
    res.redirect('/');
  });


// passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/login",
// })
// );

// router.get("/getCurrentUser", (req, res) => {
//   // console.log("-----------",req)
//   console.log("get user", req.user);
//   res.json({ user: req.user, msg: "something" });
// });

export default router;