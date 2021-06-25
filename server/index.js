const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const client = require("twilio")(accountSid, authToken);
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../database/index.js");

app.use(express.static("./client/public"));

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/users/register", (req, res) => {
  res.send("register");
});

app.get("/users/login", (req, res) => {
  res.send("register");
});

app.get("/users", (req, res) => {
  db.query("select * from users", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/activate", (req, res) => {
  // client.messages
  //   .create({
  //     body: "Gareth is testing SMS capabilities",
  //     from: "+12562693589",
  //     to: "+14784612233",
  //   })
  //   .then((message) => {
  //     res.send(message.sid);
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });
  res.send("received");
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.listen(port, () => {
  console.log("node is listening");
});
