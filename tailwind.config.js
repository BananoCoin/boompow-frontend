module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#1d1e26",
        dark: "#151517",
        accent: {
          DEFAULT: "#ddb242",
          secondary: "#ebbf3d"
        },
        // * BANANO PRESS KIT
        banano: {
          yellow: "#FBDD11",
          green: "#4CBF4B",
          gray: {
            DEFAULT: "#2A2A2E",
            dark: "#212124"
          }
        }
      },
      // SHOULD BE FILSON PRO, BUT I DON'T HAVE ACCESS TO THAT.
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
