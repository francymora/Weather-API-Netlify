import { Request, Response } from "express";
import {
  generateLondonWeatherData,
  generateDublinWeatherData,
  generateCambridgeWeatherData,
  generateBristolWeatherData,
  generateLondonWeatherForecast,
  generateDublinWeatherForecast,
  generateCambridgeWeatherForecast,
  generateBristolWeatherForecast
} from "../services/weatherService.js";

import { validationResult } from "express-validator";

// Funzione per ottenere i dati meteo attuali
export const getWeatherData = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error("Validation error", errors.mapped());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { city } = req.params;
    console.log(`Fetching weather data for: ${city}`);

    const weatherDataMap: Record<string, () => WeatherData> = {
      london: generateLondonWeatherData,
      dublin: generateDublinWeatherData,
      cambridge: generateCambridgeWeatherData,
      bristol: generateBristolWeatherData,
    };

    const generateWeather = weatherDataMap[city.toLowerCase()];

    if (!generateWeather) {
      return res.status(404).json({ error: "City not found" });
    }

    return res.status(200).json(generateWeather());
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return res.status(500).send("Error fetching weather data");
  }
};

// Funzione per ottenere la previsione meteo a 3 giorni
export const getWeatherForecast = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    console.log(`Fetching weather forecast for: ${city}`);

    const forecastDataMap: Record<string, () => WeatherForecast> = {
      london: generateLondonWeatherForecast,
      dublin: generateDublinWeatherForecast,
      cambridge: generateCambridgeWeatherForecast,
      bristol: generateBristolWeatherForecast,
    };

    const generateForecast = forecastDataMap[city.toLowerCase()];

    if (!generateForecast) {
      return res.status(404).json({ error: "City not found" });
    }

    return res.status(200).json(generateForecast());
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    return res.status(500).send("Error fetching weather forecast");
  }
};
