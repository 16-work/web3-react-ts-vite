import i18n from '@/constants/i18n';
import { convertLanguageMap, LANGUAGE, languageOptions } from '@/constants/i18n/config';

/** Component */
export const SwitchLanguage = () => {
  /** Retrieval */
  const [language, setLanguage] = useState(LANGUAGE);

  /** Actions */
  const onChangeLanguage = (value: string) => {
    const language = convertLanguageMap[value] ? convertLanguageMap[value] : value;
    setLanguage(language);
    i18n.changeLanguage(language);
    localCache.set('language', language);
  };

  /** Template */
  return (
    <DropList value={language} options={languageOptions} onSelect={(value) => onChangeLanguage(value)} arrow={true} hideDropArrow={true} trigger={['hover']}>
      <Svg name="language" className="layout-nav-icon-w hover-primary" />
    </DropList>
  );
};
