/** tailwind快捷变量(eg. bg-primary-1)
 * text属性会收录下列除second外的其它色彩
 * 其它属性(bg、border...)会收录下列所有色彩
 * other的颜色一般不用放进来，除非你要用在tailwindcss里
 */

export const cusColors = {
  primary: {
    'primary-1': 'rgb(var(--cus-primary-1) , <alpha-value>)',
    'primary-2': 'rgb(var(--cus-primary-2) , <alpha-value>)',
  },
  second: {
    'second-1': 'rgb(var(--cus-second-1) , <alpha-value>)',
    'gray-100': 'rgb(var(--cus-gray-100) , <alpha-value>)',
    'gray-500': 'rgb(var(--cus-gray-500) , <alpha-value>)',
    'gray-900': 'rgb(var(--cus-gray-900) , <alpha-value>)',
  },
  feature: {
    'relax-1': 'rgb(var(--cus-relax-1) , <alpha-value>)',
    'info-1': 'rgb(var(--cus-info-1) , <alpha-value>)',
    'info-2': 'rgb(var(--cus-info-2) , <alpha-value>)',
    'warning-1': 'rgb(var(--cus-warning-1) , <alpha-value>)',
    'stress-1': 'rgb(var(--cus-stress-1) , <alpha-value>)',
    'popover-1': 'rgb(var(--cus-popover-1) , <alpha-value>)',
  },
  text: {
    'common-1': 'rgb(var(--text-common-1) , <alpha-value>)',
    'tip-1': 'rgb(var(--text-tip-1) , <alpha-value>)',
  },
  base: {
    'black': '#000',
    'white': '#fff',
    'transparent': 'transparent',
  },
};
