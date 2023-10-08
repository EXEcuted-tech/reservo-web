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
            opacity: '1',
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
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1.1)',
          },     
        },
        'swipe-down':{
          '0%':{
            transform: 'translateY(0)',
          },
          '50%':{
            transform: 'translateY(-10px)',
          },
          '100%':{
            transform: 'translateY(0)',
          }
        },
        'small-fade-in-down': {
          '0%': {
              opacity: '1',
              transform: 'translateY(-10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0px)'
          },
      },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
        'zoom-in': 'zoom-in 0.6s ease-out',
        'zoom-in-end': 'zoom-in-end 0.8s ease-out',
        'swipe-down': 'swipe-down 1.5s ease-in-out infinite',
        'small-fade-in-down': 'small-fade-in-down 0.5s ease-out',
      },
    },
  },
  plugins: [],
}

