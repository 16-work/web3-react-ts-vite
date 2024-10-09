/** Component */
export const SearchSuggestions = () => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Params */
  const suggestions = useMemo(() => [t('tip.rightKeywords'), t('tip.diffKeywords'), t('tip.moreKeywords')], [t]);

  /** Template */
  return (
    <div className="w-full flex flex-col mt-100">
      {/* title */}
      <h3 className="text-common-1 font-2xl text-title-1">
        {t('common.search')}
        {t('common.suggestions')}
      </h3>

      {/* rules */}
      <div className="grid gap-y-10 mt-10 p-20 rounded-8">
        {suggestions.map((item, index) => (
          <p key={index} className="text-tip-1 font-lg">
            - {item}
          </p>
        ))}
      </div>
    </div>
  );
};
