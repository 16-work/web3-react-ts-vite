import * as yup from 'yup';

// 定义提示信息
yup.setLocale({
  mixed: {
    required: 'Please enter ${label}',
    notType: 'The ${label} must be a ${type}',
  },
  number: {},
  string: {
    max: 'A maximum limit of ${max} characters',
  },
});

export default yup;
