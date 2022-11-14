const express = require("express");
const router = express.Router();

const {getCars, getCar, createCar, updateCar, deleteCar} = require('../controllers/car.js')

router.get("/", getCars);

router.get("/ID", getCar);

router.post("/", createCar);

router.put("/ID", updateCar);

router.delete("/ID", deleteCar);

module.exports = router;
