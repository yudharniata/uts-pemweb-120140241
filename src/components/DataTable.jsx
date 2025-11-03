import React from 'react';

// Fungsi helper di-pass sebagai props
const DataTable = ({ forecasts, unit, convertToFahrenheit, formatDate, getWeatherIcon }) => {
  const isCelsius = unit === 'C';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prediksi cuaca 5 hari</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuaca</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suhu</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Angin (m/s)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {forecasts.map((day) => {
              const temp = isCelsius ? day.main.temp : convertToFahrenheit(day.main.temp);
              return (
                <tr key={day.dt}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatDate(day.dt_txt)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img src={getWeatherIcon(day.weather[0].icon)} alt={day.weather[0].description} className="w-10 h-10 inline-block" />
                    <span className="ml-2 capitalize">{day.weather[0].description}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(temp)}°{unit}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{day.wind.speed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
