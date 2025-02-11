import { t } from 'i18next';
import * as yup from 'yup';

// 第一次初始化写在这（不用useEffect，会失效）
yup.setLocale({
  mixed: {
    required: ({ label }) => t('tip.enter', { label }),
    notType: ({ label, type }) => t('tip.type', { label, type }),
  },
  number: {
    positive: ({ label }) => t('tip.positive', { label }),
    integer: ({ label }) => t('tip.integer', { label }),
  },
  string: {
    max: ({ max }) => t('tip.maxCharacters', { max }),
    min: ({ min }) => t('tip.minCharacters', { min }),
  },
});

export default yup;
