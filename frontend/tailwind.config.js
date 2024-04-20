
const { keyframes } = require("@emotion/react");
const withMT = require("@material-tailwind/react/utils/withMT");
const { Translate } = require("@mui/icons-material");

// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       fontFamily: {
//         poppins: ['Poppins', 'sans-serif'],
//         montserrat: ['Montserrat', 'sans-serif'],
//         opensans: ['Open sans', 'sans-serif'],
//         roboto: ['Roboto', 'sans-serif'],
//         // axiforma: ['Axiforma Regular'],
//       },
//       fontSize: {
//         14: '14px',
//       },
//       textColor: {
//         'text': 'hsl(0, 0, 98%)',
//       },
//       backgroundColor: {
//         'main-bg': '#FAFBFB',
//         'main-dark-bg': '#09090B',
//         'secondary': 'hsl(240, 3.7%, 15.9%)',
//         'tertiary-dark-bg': '#5b636e',
//         'light-gray': '#F7F7F7',
//         'accent': '#fef27a',
//         'half-transparent': 'rgba(0, 0, 0, 0.5)',
//       },
//       borderWidth: {
//         1: '1px',
//       },
//       borderColor: {
//         'border': 'hsl(240, 3.7%, 15.9%)',
//       },
//       minHeight: {
//         590: '590px',
//       },
//       backgroundImage: {
//         'hero-pattern':
//           "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
//       },
//     },
//   },
//   plugins: [
//     function ({addUtilities}) {
//       const newUtilities = {
//         '.no-scrollbar::-webkit-scrollbar' : {
//           display: 'none',
//         },
//         '.no-scrollbar': {
//           '-ms-overflow-style': 'none',
//           'scrollbar-width': 'none',
//         },
//       }
//       addUtilities(newUtilities);
//     }
//   ],
// };

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['Open sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        // axiforma: ['Axiforma Regular'],
      },
      fontSize: {
        14: '14px',
      },
      textColor: {
        'text': 'hsl(0, 0, 98%)',
      },
      backgroundColor: {
        'main': '#09090B',
        'main-dark-bg': '#09090B',
        'secondary': 'hsl(240, 3.7%, 15.9%)',
        'tertiary-dark-bg': '#5b636e',
        'light-gray': '#F7F7F7',
        'accent': '#fef27a',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        'border': 'hsl(240, 3.7%, 15.9%)',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
      },
      keyframes: {
        moveleftpersonal: {
          '0%': { transform: 'translateX(100%)' },
          '50%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        moverightpersonal: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        movelefthome: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        moverighthome: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        moveleftpersonal: 'moveleftpersonal 0.2s ease-out',
        moverightpersonal: 'moverightpersonal 0.2s ease-out',
        movelefthome: 'movelefthome 0.2s ease-out',
        moverighthome: 'moverighthome 0.2s ease-out',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      }
      addUtilities(newUtilities);
    }
  ],
});