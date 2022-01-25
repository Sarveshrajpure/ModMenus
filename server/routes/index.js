const express = require("express");
const userRoute = require("./user.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/user",
    route: userRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
