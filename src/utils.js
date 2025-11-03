/**
 * Konversi suhu dari Celsius ke Fahrenheit
 * @param {number} celsius - Suhu dalam Celsius
 * @returns {number} - Suhu dalam Fahrenheit
 */
export const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32;

/**
 * Format tanggal dari string 'YYYY-MM-DD HH:MM:SS' ke 'NamaHari, Tgl Bulan'
 * @param {string} dateString - String tanggal
 * @returns {string} - Tanggal yang diformat
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
};

/**
 * Mendapatkan URL ikon cuaca dari OpenWeatherMap
 * @param {string} iconCode - Kode ikon (misal: "01d")
 * @returns {string} - URL lengkap ke gambar ikon
 */
export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
