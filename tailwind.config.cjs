/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'barcode': "url('https://static-prod.adweek.com/wp-content/uploads/2022/03/datapointsqr.png')"
      }
    },
  },
  plugins: [],
};

module.exports = config;
