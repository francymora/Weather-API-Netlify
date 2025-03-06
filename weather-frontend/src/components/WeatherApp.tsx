import { useState } from "react";

// Aggiorna l'interfaccia per includere tutti i dati necessari
interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
}

const WeatherApp = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Enter a valid city!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/weather/${city.toLowerCase()}`);
      if (!response.ok) throw new Error("City not found");

      const data: WeatherData = await response.json();
      setWeather({
        city: city,
        temperature: data.temperature,
        humidity: data.humidity,
        wind: data.wind,
        rain: data.rain,
      });
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind} km/h</p>
          <p>Rain: {weather.rain}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
