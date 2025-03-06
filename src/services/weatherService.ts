import { faker } from "@faker-js/faker";

interface WeatherData {
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
}
interface WeatherForecast {
  dayOne: number;
  dayTwo: number;
  dayThree: number;
}


/**
 * 
 * @returns {WeatherData}
 */
const generateWeatherData = (): WeatherData => ({
  temperature: faker.number.int({ min: -15, max: 30 }),
  humidity: faker.number.int({ min: 79, max: 86 }),
  wind: faker.number.int({ min: 2, max: 78 }),
  rain: faker.number.int({ min: 65, max: 75 }),
});

const generateForecast = (): WeatherForecast => {
  return {
    dayOne: faker.number.int({ min: -5, max: 30 }),
    dayTwo: faker.number.int({ min: -5, max: 30 }),
    dayThree: faker.number.int({ min: -5, max: 30 }),
  };
};

export const generateLondonWeatherData = generateWeatherData;
export const generateDublinWeatherData = generateWeatherData;
export const generateCambridgeWeatherData = generateWeatherData;
export const generateBristolWeatherData = generateWeatherData;

export const generateLondonWeatherForecast = generateForecast;
export const generateDublinWeatherForecast = generateForecast;
export const generateCambridgeWeatherForecast = generateForecast;
export const generateBristolWeatherForecast = generateForecast;