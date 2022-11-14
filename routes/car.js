const express = require("express");
const router = express.Router();

const {getCars, getCar, createCar, updateCar, deleteCar} = require('../controllers/car.js')

router.get("/", getCars);

router.get("/getID", getCar);

router.post("/", createCar);

router.put("/:id", updateCar);

router.delete("/:id", deleteCar);

module.exports = router;
