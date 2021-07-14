const typography = require("@tailwindcss/typography")
const forms = require("@tailwindcss/forms")
const aspectRatio = require("@tailwindcss/aspect-ratio")
const defaultTheme = require("tailwindcss/defaultTheme")

/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 **/
module.exports = {
  mode: "jit",
  purge: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [aspectRatio, forms, typography],
}
