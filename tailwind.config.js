/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        sage: {
          50: '#F4F7F4',
          100: '#E6EDE5',
          200: '#CFDCCE',
          300: '#A9C0A8',
          400: '#7E9F7C',
          500: '#5C7E5A',
          DEFAULT: '#8A9E89',
          dark: '#3A4D39',
        },
        eucalyptus: {
          light: '#E2EBE5',
          DEFAULT: '#728C7D',
          dark: '#394B41',
        },
        forest: {
          DEFAULT: '#2C3E2D',
          dark: '#1E2B1F',
        },
        champagne: {
          50: '#FAF8F2',
          100: '#F5EFE1',
          200: '#ECE0C6',
          300: '#E0CFA4',
          DEFAULT: '#F8F4E9',
        },
        ivory: {
          DEFAULT: '#FEFDFB',
          soft: '#FDFBF7',
          dark: '#F4EFE6',
        },
        gold: {
          light: '#F5E3B3',
          DEFAULT: '#D4AF37',
          deep: '#AA820A',
          muted: '#C5A059',
          foil: '#E5C158',
        },
        rose: {
          gold: '#B76E79',
          deep: '#9D4A55',
          blush: '#F2D2BD',
          silk: '#FDF6F0',
        },
        mahogany: {
          DEFAULT: '#3E2723',
          light: '#533833',
          dark: '#2A1A17',
        },
        warm: {
          gray: '#6D5B53',
          stone: '#8C7A72',
          dark: '#251E1C',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Parastoo', 'Vazirmatn', 'system-ui', 'sans-serif'],
        display: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        fairytale: ['"Cinzel Decorative"', '"Playfair Display"', 'serif'],
        fantasy: ['Shekasteh', 'Katibeh', 'Parastoo', 'serif'],
        nastaliq: ['Shekasteh', 'Shekasteh V2', 'IranNastaliq', 'Katibeh', 'serif'],
        parastoo: ['Parastoo', 'Vazirmatn', 'serif'],
        mirza: ['Mirza', 'Katibeh', 'serif'],
        katibeh: ['Katibeh', 'Parastoo', 'Amiri', 'serif'],
        ruqaa: ['"Aref Ruqaa"', 'Katibeh', 'Parastoo', 'serif'],
        gulzar: ['Gulzar', 'Katibeh', 'Parastoo', 'serif'],
        lalezar: ['Lalezar', 'Katibeh', 'sans-serif'],
        vazir: ['Vazirmatn', 'sans-serif'],
        persianDisplay: ['Shekasteh', 'Shekasteh V2', 'IranNastaliq', 'Katibeh', 'serif'],
        persianSerif: ['Katibeh', 'Parastoo', 'Amiri', 'serif'],
        persianSans: ['Parastoo', 'Vazirmatn', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.25)',
        'rose-glow': '0 0 35px rgba(183, 110, 121, 0.25)',
        'ambient': '0 20px 40px -15px rgba(62, 39, 35, 0.08)',
        'ambient-lg': '0 30px 60px -20px rgba(62, 39, 35, 0.12)',
        'luxury': '0 10px 30px -5px rgba(212, 175, 55, 0.15)',
        'inner-gold': 'inset 0 0 20px rgba(212, 175, 55, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}