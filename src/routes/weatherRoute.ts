import express from "express";
import { getWeatherData, getWeatherForecast } from "../controllers/weatherController.js";
import { validateCityName } from "../middleware/validators.js";

const router = express.Router();


router.get("/:city", validateCityName, getWeatherData);

router.get("/:city/forecast", validateCityName, getWeatherForecast);

export default router;
