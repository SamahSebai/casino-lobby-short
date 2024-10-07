/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      'display': ['Poppins', 'font-sans'],
      'body': ['"Posppins"', 'font-sans'],
    },
    extend: {
      fontFamily: {
        'sans': ["Poppins",'Prompt', 'sans-serif'],
      },
    },
    colors: {
      lm_white: '#FFFFFF',
      lm_bg: '#e9e9e9', //F8F8F8
      lm_primary: '#0b1e3e',
      green_primary: '#45B39D',
      green_dark: '#16A085',
      green_secondary: '#73C6B6',
      lm_text1: '#191D23',
      lm_text2: '#2D2929',
      lm_text3: '#667085',
      lm_grey: '#F9FAFB',
      lm_grey_btn: '#D0D5DD',
      lm_grey_icon: '#3A3C59',
      lm_blue: '#5677B4',
      dm_bg: '#121212',
      dm_div_bg1: '#2D2D2D',
      dm_div_bg2: '#353535',
      dm_div_bg3: '#454545',
      dm_dark_icons: '#2D2D2D',
      dm_selected: '#454545',
      dm_purple: '#BB86FC',
      dm_text: '#FFFFFF',
      dm_text2: '#FCFCFC',
      f_dgreen: '#16a085',
      f_mgreen: '#3afed8',
      f_lgreen: '#35f5d0',
      f_blue: '#1F3E5A',
      f_bg0: '#e2f3f0',
      f_bg1: '#f0f8f7',
      f_orange: '#e2f3f0',
      f_bgreen: '#16A085',
      f_green: '#356033',
      f_tittle: '#16a085',
      f_tittle2: '#1f3e5a',
      f_tittle3: '#89b5ac',
      f_text: '#858585',
      f_text2: '#89B5AC',
      f_lborder: '#b5ddd6',
    }
  },
  plugins: [],
  important:true,
}