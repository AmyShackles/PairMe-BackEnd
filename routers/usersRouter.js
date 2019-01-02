require("dotenv").config();

const express = require("express");

const jwt = require("jsonwebtoken");

const usersDb = require("../data/helpers/usersHelpers.js");

const router = express.Router();

// generates jwt
const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
    email: user.email,
    slackHandle: user.slack_handle
  };

  const secret = process.env.JWT_SECRET || "super secret!"; // don't forget to update production environment

  const options = {
    expiresIn: "6h"
  };

  return jwt.sign(payload, secret, options);
};

// [GET] /api/users
// returns array of all users in db (or empty if none)
router.get("/", (req, res) => {
  usersDb
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retreiving users" });
    });
});

// [POST] /api/users/register
// registers an new user
router.post("/register", async (req, res) => {
  const newUser = req.body;
  try {
    const availableEmail = await usersDb.availableEmail(newUser.email);
    const availableUsername = await usersDb.availableUsername(newUser.username);
    const availableHandle = await usersDb.availableHandle(newUser.slack_handle);

    if (availableEmail && availableUsername && availableHandle) {
      const insertResponse = await usersDb.registerUser(newUser);
      const token = generateToken(newUser);
      res.status(201).json({ insertResponse, token });
    } else {
      switch (true) {
        case availableEmail && availableUsername:
          res.status(400).json({ message: "Handle already in use" });
          break;
        case availableEmail && availableHandle:
          res.status(400).json({ message: "Username already in use" });
          break;
        case availableHandle && availableUsername:
          res.status(400).json({ message: "Email already in use" });
          break;
        case availableEmail:
          res
            .status(400)
            .json({ message: "Username and handle already in use" });
          break;
        case availableUsername:
          res.status(400).json({ message: "Email and handle already in use" });
          break;
        case availableHandle:
          res
            .status(400)
            .json({ message: "Email and username already in use" });
          break;
        default:
          res
            .status(400)
            .json({ message: "Email, username, and handle already in use" });
          break;
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Error registering new user", err });
  }
});

module.exports = router;
