/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#343434',
                accent: '#e5e5e5',
                background: '#f7f7f7',
                gray: '#686868'
            }
        },
    },
    plugins: [],
}