/** @type {import('tailwindcss').Config} */

import { cusColors } from './config/tailwindcss/color';
import { screenSizes, commonSizes } from './config/tailwindcss/sizes';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...cusColors.primary,
      ...cusColors.feature,
      ...cusColors.base,
      ...cusColors.second,
    },
    textColor: {
      ...cusColors.primary,
      ...cusColors.second,
      ...cusColors.feature,
      ...cusColors.base,
      ...cusColors.text,
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
