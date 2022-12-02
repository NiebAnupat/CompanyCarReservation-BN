const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getCars,
  getCar,
  getCarsByEmployee,
  createCar,
  updateCar,
  deleteCar,
  toggleFavoriteCar,
  getFavoriteCars
} = require("../controllers/car.js");

router.get("/all", getCars);

router.get("/by/:id", getCar);

router.get("/:EM_ID/cars",getCarsByEmployee);


router.get("/favoritecar/:EM_ID", getFavoriteCars);

router.post("/",upload.array('car_img'), createCar);

router.put("/edit/",upload.array('car_img'), updateCar);

router.put("/favorite/:id", toggleFavoriteCar);

router.delete("/:id", deleteCar);

module.exports = router;
