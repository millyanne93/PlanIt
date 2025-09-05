/** @type {import('tailwindcss').Config} */
module.exports = {
      content: [
              "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path if necessary
            ],
      theme: {
              extend: {
                        colors: {
                                    darkPink: '#D5006D', // Main dark pink color
                                    lightPink: '#FF4081', // Lighter shade of pink
                                    pinkAccent: '#F50057', // Accent color
                                  },
                      },
            },
      plugins: [],
};
