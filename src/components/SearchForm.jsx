import React, { useState, useEffect } from 'react';

const SearchForm = ({ onSearch, API_KEY }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Form input nama kota dengan autocomplete suggestion
  useEffect(() => {
    // Jika inputan kosong atau API Key tidak ada, tidak melakukan apa-apa
    if (city.length < 3 || !API_KEY) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // menunda pencarian 300ms setelah pengguna berhenti mengetik
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    const fetchSuggestions = async () => {
      try {
        // Geocoding API untuk mencari kota untuk autofill
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Gagal mengambil saran kota');
        
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    // Bersihkan timeout saat pengguna mengetik lagi
    return () => clearTimeout(delayDebounceFn);
  }, [city, API_KEY]);

  // --- HANDLER ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = suggestion.name;
    setCity(cityName);
    onSearch(cityName);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-white p-6 rounded-lg shadow-md">
      <label htmlFor="city-search" className="block text-lg font-medium text-gray-700 mb-2">
        Cari Kota
      </label>
      <div className="flex">
        <input
          type="text"
          id="city-search"
          value={city}
          onChange={handleInputChange}
          placeholder="e.g., Bandar Lampung"
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          autoComplete="off" // Matikan autocomplete bawaan browser
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Cari
        </button>
      </div>
      
      {/* --- DROPDOWN SUGGESTIONS --- */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg mt-1 shadow-xl">
          {suggestions.map((s, index) => (
            <li 
              key={`${s.lat}-${s.lon}-${index}`}
              className="p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors duration-150"
              onClick={() => handleSuggestionClick(s)}
            >
              {s.name}, {s.state ? `${s.state}, ` : ''}{s.country}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchForm;
