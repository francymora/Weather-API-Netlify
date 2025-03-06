import { param } from "express-validator";

/**
 * Validates the city name param
 * @returns {ValidationChain} - Express validator validation chain
 * @example
 * router.get(
 *  "/:city",
 * validateCityName,
 * getWeatherData
 * );
 */
export const validateCityName = param("city")
  .isString()
  .isIn(["london", "dublin", "cambridge", "bristol"])
  .withMessage("City name must be either london, dublin, cambridge, or bristol"); // Messaggio aggiornato
