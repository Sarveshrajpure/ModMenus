const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const menucard = require("./menucard.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  // {
  //   path: "/menucard",
  //   route: menucard,
  // },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
