/** @type {import('tailwindcss').Config} */

import { baseColors, cusColors, textColors, featureColors, } from './config/tailwindcss/color';
import { screenSizes, commonSizes } from './config/tailwindcss/sizes';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...cusColors,
      ...baseColors,
      ...featureColors,
    },
    textColor: {
      ...textColors,
      ...baseColors,
      ...featureColors,
    },
    extend: {
      screens: screenSizes,
      fontSize: commonSizes,
      width: commonSizes,
      minWidth: commonSizes,
      maxWidth: commonSizes,
      height: commonSizes,
      minHeight: commonSizes,
      maxHeight: commonSizes,
      padding: commonSizes,
      margin: commonSizes,
      inset: commonSizes,
      gap: commonSizes,
      borderWidth: commonSizes,
      borderRadius: commonSizes,
      lineHeight: commonSizes,
    },
  },
  plugins: [],
};
