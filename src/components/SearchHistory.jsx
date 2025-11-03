import React from 'react';

const SearchHistory = ({ history = [], onHistoryClick, onClearHistory }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">Riwayat Pencarian</h2>
      {history.length > 0 && (
        <button
          onClick={onClearHistory}
          className="text-sm text-blue-500 hover:underline"
        >
          Hapus
        </button>
      )}
    </div>
    {history.length === 0 ? (
      <p className="text-gray-500">Belum ada riwayat pencarian.</p>
    ) : (
      <ul className="space-y-2">
        {history.map((city) => (
          <li key={city}>
            <button
              onClick={() => onHistoryClick(city)}
              className="w-full text-left p-2 rounded-lg text-gray-700 hover:bg-blue-100"
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchHistory;
