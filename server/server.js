const express = require("express");
const app = express();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const routes = require("./routes");

///body parser
app.use(express.json());

///sanitize
app.use(xss());
app.use(mongoSanitize());

///CORS
app.use(cors());

///routes
app.use("/api", routes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
