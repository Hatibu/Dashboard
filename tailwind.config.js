module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'gray-101': '#CCCCCC',
        'red-101': '#EC1C24',
        'green-101': '#556B2F',
        'blue-901': '#0A1931',
       
        
      },
     
    },
  },
  variants: {
    extend: {
     
    },
  },
  plugins: [],
};
