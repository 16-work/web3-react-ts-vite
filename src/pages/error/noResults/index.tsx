import { SearchSuggestions } from './components/SearchSuggestions';

/** Component */
export const PageNoResults = () => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Template */
  return (
    <div className="w">
      {/* btn: back */}
      <div className="w-fit absolute z-[1] top-10 xs:left-20 md:left-0">
        <Link to={path.home}>
          <Svg name="arrow-left" className="w-22 hover-primary" />
        </Link>
      </div>

      {/* main */}
      <div className="relative xs:w-full md:w-840 m-auto page-min-h flex-align-y justify-center mt-26">
        {/* title */}
        <h3 className="xs:text-40 md:text-34 text-title-1 text-center mb-20">
          {t('common.search')}
          {t('common.results')}
        </h3>

        {/* search bar */}
        <InputSearch value="" onChange={() => {}} onSearch={() => {}} />

        {/* no exists */}
        <p className="mt-30 text-tip-1 font-lg text-center">{t('tip.noFound', { keyword: router.query.get('keyword') })}</p>

        {/* suggestions */}
        <SearchSuggestions />
      </div>
    </div>
  );
};
