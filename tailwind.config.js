module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        // * BANANO PRESS KIT
        banano: {
          yellow: "#FBDD11",
          green: "#4CBF4B",
          gray: {
            DEFAULT: "#2A2A2E",
            dark: "#212124",
          },
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
