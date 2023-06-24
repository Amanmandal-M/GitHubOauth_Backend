const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const gitHubRouter = express.Router();
const colors = require("colors");
require("dotenv").config();

const { userModel } = require("../models/authModel");

// Configure session middleware for Express
gitHubRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Configure Passport
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Custom logic to handle user profile after authentication
      // e.g., saving user details in a database
      saveDataOfUser(profile);
      done(null, profile.id); // Pass only the user ID for serialization
    }
  )
);

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser(async (userId, done) => {
  try {
    // Retrieve user data from the database using the user ID
    const user = await userModel.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Function to save user data to the database
async function saveDataOfUser({
  id,
  displayName,
  username,
  profileUrl,
  photos,
}) {
  try {
    // Check if the user already exists in the database
    const isPresent = await userModel.findOne({ GithubId: id });

    if (!isPresent) {
      // Create a new user document and save it to the database
      const data = new userModel({
        GithubId: id,
        DisplayName: displayName,
        Username: username,
        ProfileUrl: profileUrl,
        Photos: photos[0].value,
      });
      await data.save();
    } else {
      console.log(colors.bgRed.white("User already exists in the database."));
    }
  } catch (error) {
    console.log(colors.bgRed.black(`Error in Database : ${error.message}`));
  }
}

// Set up routes
gitHubRouter.use(passport.initialize());
gitHubRouter.use(passport.session());

gitHubRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

gitHubRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    res
      .status(200)
      .json(
        "Email is Verified ... This is for Checking Only ... If this is coming here it means all the things are working fine"
      );
  }
);

module.exports = { gitHubRouter };
