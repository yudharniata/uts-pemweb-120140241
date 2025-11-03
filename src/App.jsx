import { useState, useEffect } from 'react';

// Impor semua komponen
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DetailCard from './components/DetailCard';
import DataTable from './components/DataTable';
import SearchHistory from './components/SearchHistory';

// Impor semua helper
import { convertToFahrenheit, formatDate, getWeatherIcon } from './utils';

// Memuat CSS (diimpor di index.js, tapi bisa juga di sini)
// import './index.css'; 

function App() {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('weatherSearchHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.warn("Gagal membaca localStorage:", error);
      return [];
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil API Key dari file .env.local
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Efek untuk menyimpan history ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
    } catch (error) {
      console.warn("Gagal menulis ke localStorage:", error);
    }
  }, [searchHistory]);

  // Memuat data default saat pertama kali dibuka
  useEffect(() => {
    fetchWeather("Bandar Lampung");
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []); 

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setCurrentWeather(null);
    setForecast([]);

    try {
      // Cuaca Saat Ini
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const currentResponse = await fetch(currentUrl);
      if (!currentResponse.ok) {
        throw new Error(`Gagal mengambil data cuaca saat ini.`);
      }
      const currentData = await currentResponse.json();
      
      // Prediksi Cuaca dalam 5 Hari
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        throw new Error(`Gagal mengambil prakiraan cuaca.`);
      }
      const forecastData = await forecastResponse.json();

      // Data prediksi (1 data per hari)
      const dailyForecasts = forecastData.list.filter(reading => 
        reading.dt_txt.includes("12:00:00")
      );

      // Set state
      setCurrentWeather(currentData);
      setForecast(dailyForecasts);

      // Tambah history
      if (!searchHistory.includes(currentData.name)) {
        const newHistory = [currentData.name, ...searchHistory].slice(0, 5); 
        setSearchHistory(newHistory);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = () => {
    setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  const handleHistoryClick = (city) => {
    fetchWeather(city);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem('weatherSearchHistory');
    } catch (error) {
      console.warn("Gagal menghapus localStorage:", error);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        <Header onUnitToggle={handleUnitToggle} currentUnit={unit} />
        
        <main className="mt-8">
          <SearchForm onSearch={handleSearch} API_KEY={API_KEY} />

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {!loading && !error && currentWeather && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              
              <div className="md:col-span-1 flex flex-col gap-8">
                <DetailCard 
                  weather={currentWeather} 
                  unit={unit} 
                  convertToFahrenheit={convertToFahrenheit} 
                  getWeatherIcon={getWeatherIcon}
                />
                <SearchHistory 
                  history={searchHistory} 
                  onHistoryClick={handleHistoryClick} 
                  onClearHistory={handleClearHistory} 
                />
              </div>

              <div className="md:col-span-2">
                <DataTable 
                  forecasts={forecast} 
                  unit={unit} 
                  convertToFahrenheit={convertToFahrenheit} 
                  formatDate={formatDate}
                  getWeatherIcon={getWeatherIcon}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
