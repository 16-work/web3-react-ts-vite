import { LANGUAGE } from '@/constants/common';
import i18n from '@/i18n';

/** Constants */
const options = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh-TW' },
];

/** Component */
export const SwitchLanguage = () => {
  /** Retrieval */
  const [language, setLanguage] = useState(LANGUAGE);

  /** Actions */
  const onChangeLanguage = (value: string) => {
    const language = value === 'zh-CN' ? 'zh-TW' : value;
    setLanguage(language);
    i18n.changeLanguage(language);
    localCache.set('language', language);
  };

  /** Template */
  return (
    <DropList value={language} options={options} onSelect={(value) => onChangeLanguage(value)} arrow={true} hideDropArrow={true} trigger={['hover']}>
      <Svg name="language" className="xs:w-50 md:w-40 hover-primary" />
    </DropList>
  );
};
