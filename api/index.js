const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

const userRoute = require("./routes/user");
const studentRoute = require("./routes/students");
const teachersRoute = require("./routes/teachers");
const marksRoute = require("./routes/marks");
app.use("/api/users", userRoute);
app.use("/api/students", studentRoute);
app.use("/api/teachers", teachersRoute);
app.use("/api/marks", marksRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(3000, () => console.log("Server running on port 3000"));
