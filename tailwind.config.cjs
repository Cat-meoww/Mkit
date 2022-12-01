const colors = require("tailwindcss/colors");
let newcolors = {
  mongo: {
    100: "#6ce196",
    neutral: "#bfb8ac",
    white: "#e5e0d8",
    icon: "#a49b8e",
    card: {
      backdrop: "#131d2399",
      textcolor: "#a79e91",
      bg: "#242525",
      hoverbg: "#2b3531",
      btnborder: "#575b5c",
    },
    sidebar: {
      db: {
        hoverbg: "#24252500",
      },
    },
    green: {
      btn: "#1b6744",
      hover: "#1f5240",
    },
  },
  mongodark: {
    100: "#242525", //card bg
    200: "#404243", //card onselec border
  },

  mongoshade: "#2a343b",
};
let mycolors = { ...colors, ...newcolors };
module.exports = {
  content: [
    "./src/routes/**/*.{svelte,js,ts}",
    "./src/lib/Components/**/*.{svelte,js,ts}",
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          neutral: "#242525",
          "base-100": "#282a2a",
          "base-200": "#3C474A",
          "base-300": "#273137",
        },
      },
    ],
  },
  theme: {
    colors: mycolors,
  },
};
