import i18n from '@/constants/i18n';
import { filterLanguage, LANGUAGE, supportLanguages } from '@/constants/i18n/config';

const options = Object.entries(supportLanguages).map((item) => {
  return { label: item[1], value: item[0] };
});

/** Component */
export const SwitchLanguage = () => {
  /** Retrieval */
  const [language, setLanguage] = useState(localCache.get('language', LANGUAGE));

  /** Actions */
  const onChangeLanguage = (value: string) => {
    const language = filterLanguage(value);
    setLanguage(language);
    i18n.changeLanguage(language);
    localCache.set('language', language);
  };

  /** Template */
  return (
    options.length > 1 && (
      <DropList
        value={language}
        options={options}
        onSelect={(value) => onChangeLanguage(value)}
        children={() => <Svg name="language" className="xs:w-60 md:w-30 hover-primary" />}
      />
    )
  );
};
