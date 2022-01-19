const express = require("express");
const app = express();

const cors = require("cors");

///body parser
app.use(express.json());

///CORS
app.use(cors());

///routes

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
