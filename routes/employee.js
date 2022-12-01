const express = require("express");
const router = express.Router();

const {
  login,
  getEmployee,
  addFavoriteCar,
  getFavoriteCars,
  deleteFavoriteCar,
  getFine,
  updateFine,
  addFine,
  subtractFine,
} = require("../controllers/employee.js");

router.get("/login", login);

router.get("/", getEmployee);

router.get("/:id/favorite", getFavoriteCars);

router.post("/:id/favorite", addFavoriteCar);

router.delete("/:id/favorite/", deleteFavoriteCar);

router.get("/:id/fine", getFine);

router.put("/:id/fine", updateFine);

router.post("/:id/fine", addFine);

router.put("/:id/fine/subtract", subtractFine);

module.exports = router;
