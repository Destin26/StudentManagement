const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
const jwt = require("jsonwebtoken");

const userRoute = require("./routes/user");
const studentRoute = require("./routes/students/students");
const teachersRoute = require("./routes/teachers/teachers");
const marksRoute = require("./routes/marks/marks");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const hello = "sad";
  console.log("sdasdsad", authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "SecretKey", (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Token Invalid",
          auth: false,
        });
      }
      req.user = user;
      console.log("Verfied", user);
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

app.use("/api/users", userRoute);
app.use("/api/students", studentRoute);
app.use("/api/teachers", verify, teachersRoute);
app.use("/api/marks", marksRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(3000, () => console.log("Server running on port 3000"));

//testintg