const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Pool = require("pg").Pool;
const cookieparser = require("cookie-parser");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "StudentSchool1",
  password: "0000",
  port: 5432,
});

router.use(express.json());
router.use(cookieparser());

let users;
pool.query("SELECT * FROM teachers", (err, result) => {
  if (err) return console.log("Error" + err);
  users = [...result.rows];
  console.log(users);
});

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "SecretKey", {
    expiresIn: "10m",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "SecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("TOken is not valid");
      }
      req.user = user;
      console.log("Verfied", user);
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
const verifyRefreshToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, "myRefreshSecretKey", (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json("TOken is not valid");
      }
      req.user = user;
      console.log("Verfied", user);
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  pool.query(
    `INSERT INTO teachers (username,password) VALUES ($1, $2)`,
    [username, password],
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.status(200).send("Teacher Registered");
    }
  );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });
  console.log(username, password);
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    //response to the client
    res
      .setHeader("Access-Control-Allow-Origin", "http://localhost:5000")
      .setHeader("Access-Control-Allow-Credentials", true)
      .cookie("accesstoken", accessToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 60 * 1000),
        httpOnly: false,
      })
      .cookie("refreshToken", refreshToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 60 * 1000),
        httpOnly: false,
      })
      .json({
        auth: true,
        username: user.username,
        isAdmin: user.isAdmin,
        // AccessToken: accessToken,
        // RefreshToken: refreshToken,
      });
  } else {
    res.status(400).json({
      auth: false,
      message: "username or password is incorrect",
    });
  }
});

router.post("/refresh", (req, res) => {
  console.log("Refresh request", req.cookies.refreshToken);
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res
      .status(401)
      .json({ message: "You are not authenticated", auth: false });
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Token Not Valid", auth: false });
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);
    res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "http://localhost:5000")
      .setHeader("Access-Control-Allow-Credentials", true)
      .cookie("accesstoken", newAccessToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 100 * 1000),
        httpOnly: false,
      })
      .cookie("refreshToken", newRefreshToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 100 * 1000),
        httpOnly: false,
      })
      .json({
        auth: true,
      });
  });
});

router.post("/logout", verifyRefreshToken, (req, res) => {
  const refreshToken = req.headers.authorization.split(" ")[1];
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json({ auth: false });
});

router.delete("/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted");
  } else {
    res.status(403).json("You are not allowed to delete this user");
  }
});

module.exports = router;
