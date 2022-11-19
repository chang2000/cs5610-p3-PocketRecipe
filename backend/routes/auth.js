import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";

const router = express.Router();

router.post("/login/password", (req, res) => {
    console.log("login password", req.body)
})

export default router;
