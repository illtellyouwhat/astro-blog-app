/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@aa/astro-yi/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "600px",
      md: "720px",
      lg: "840px",
      xl: "960px",
      "2xl": "1080px"
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem"
      }
    },
    textColor: {
      skin: {
        base: withOpacity("--color-text"),
        dodge: withOpacity("--color-text-dodge"),
        active: withOpacity("--color-text-active")
      }
    },
    backgroundColor: {
      skin: {
        fill: withOpacity("--color-fill"),
        secondary: withOpacity("--color-fill-secondary"),
        card: withOpacity("--color-card"),
        modal: withOpacity("--color-modal")
      }
    },
    textDecorationColor: {
      skin: {
        base: withOpacity("--color-border"),
        active: withOpacity("--color-text-active")
      }
    },
    borderColor: {
      skin: {
        normal: withOpacity("--color-text"),
        base: withOpacity("--color-border"),
        dodge: withOpacity("--color-text-dodge")
      }
    },
    extend: {
      colors: {
        custom: {
          title: "#555555",
          subtitle: "#999999",
          hover: "#e0a419",
          active: "#ff7f50",
          grey: "#f6f6f6",
          nav: "#ded6d8",
          primary: "#edede9",
          second: "#d6ccc2",
          third: "#f5ebe0",
          forth: "#e3d5ca",
          fifth: "#d5bdaf"
        }
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(17, 24, 39, 0.35)"
      }
    }
  },
  plugins: []
};
