/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins','sans-serif'],
      },
      keyframes: {
        'slide-down': {
          '0%': {
            transform: 'translateY(-30%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'zoom-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.1)',
          },    
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },     
        },
        'zoom-in-end': {
          '0%': {
            opacity: '0',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1.1)',
          },     
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
        'zoom-in': 'zoom-in 0.6s ease-out',
        'zoom-in-end': 'zoom-in-end 0.8s ease-out'
      },
    },
  },
  plugins: [],
}

