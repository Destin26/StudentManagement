const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const userRoute = require("./routes/user");
const studentRoute = require("./routes/students");
const teachersRoute = require("./routes/teachers");
app.use("/api/users", userRoute);
app.use("/api/students", studentRoute);
app.use("/api/teachers", teachersRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log("Server running on port 3000"));
