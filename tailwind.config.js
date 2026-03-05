/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import withMT from "@material-tailwind/react/utils/withMT";


export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.yellow[400],
        secondary: colors.purple[200]
      },
    },
  },
  plugins: [],
})