const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
        cursive: defaultTheme.fontFamily.cursive
          ? ['"Odibee Sans"', ...defaultTheme.fontFamily.cursive]
          : ['"Odibee Sans"'],
      },
      colors: {
        "cautious-background": "yellow",
        "cautious-border": "black",
        "cautious-text": "black",
        "dark-shadow": "rgba(30, 30, 30, .8)",
        "happy-background": "rgb(115, 249, 144)",
        "happy-foreground": "rgb(147, 255, 170)",
        "happy-border": "rgb(95, 219, 134)",
        "main-background": "rgb(174, 227, 255)",
        "nice-foreground": "rgb(236, 206, 255)",
        "nice-background": "rgb(229, 188, 255)",
        "nice-border": "rgb(174, 7, 229)",
        "serious-background": "rgb(255, 124, 124)",
        "serious-foreground": "rgb(255, 201, 102)",
        "serious-border": "rgb(205, 74, 74)",
      },
      boxShadow: {
        nice: "0 0 3px 3px rgb(109, 148, 207)",
        cautious: "0 0 10px 3px yellow",
      },
    },
  },
  variants: {
    extend: {
      margin: ["first"],
    },
  },
  plugins: [],
};
