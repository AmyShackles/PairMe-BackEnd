require("dotenv").config();

const express = require("express");

const jwt = require("jsonwebtoken");

const usersDb = require("../data/helpers/usersHelpers.js");

const router = express.Router();

// generates jwt
const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "super secret!";

  const options = {
    expiresIn: "1h"
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
  const availableEmail = await usersDb.availableEmail(newUser.email);
  const availableUsername = await usersDb.availableUsername(newUser.username);

  if (availableEmail && availableUsername) {
    usersDb
      .registerUser(newUser)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({ message: "Error registering new user" });
      });
  } else {
    availableEmail
      ? res.status(400).json({ message: "Username already in use" })
      : availableUsername
      ? res.status(400).json({ message: "Email already in use" })
      : res.status(400).json({ message: "Username and email already in use" });
  }
});

module.exports = router;
