import React from 'react';

// Fungsi helper di-pass sebagai props
const DetailCard = ({ weather, unit, convertToFahrenheit, getWeatherIcon }) => {
  const isCelsius = unit === 'C';
  const temp = isCelsius ? weather.main.temp : convertToFahrenheit(weather.main.temp);
  const feelsLike = isCelsius ? weather.main.feels_like : convertToFahrenheit(weather.main.feels_like);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{weather.name}</h2>
      <div className="flex items-center mb-4">
        <img 
          src={getWeatherIcon(weather.weather[0].icon)} 
          alt={weather.weather[0].description} 
          className="w-20 h-20"
        />
        <div className="ml-4">
          <p className="text-5xl font-bold text-gray-900">
            {Math.round(temp)}°{unit}
          </p>
          <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
        </div>
      </div>
      <div className="space-y-2 text-gray-700">
        <p>Terasa seperti: {Math.round(feelsLike)}°{unit}</p>
        <p>Kelembapan: {weather.main.humidity}%</p>
        <p>Kecepatan Angin: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default DetailCard;
