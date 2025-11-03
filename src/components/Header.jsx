import React from 'react';

const Header = ({ onUnitToggle, currentUnit }) => (
  <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-gray-800">Dasbor Prediksi Cuaca by Yudha</h1>
    <div className="flex items-center">
      <span className="text-gray-600 mr-2">Satuan Suhu:</span>
      <button
        onClick={onUnitToggle}
        className="relative w-14 h-8 bg-gray-300 rounded-full p-1 flex items-center transition-colors duration-300"
      >
        <span
          className={`absolute left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            currentUnit === 'F' ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></span>
        <span className="absolute left-2.5 font-bold text-sm text-blue-500">C</span>
        <span className="absolute right-2.5 font-bold text-sm text-red-500">F</span>
      </button>
    </div>
  </header>
);

export default Header;
