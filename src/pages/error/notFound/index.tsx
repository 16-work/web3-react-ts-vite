/** Component */
export const PageNotFound = () => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Template */
  return (
    <div className="w h-450">
      <div className="flex flex-col items-center relative top-1/2 -translate-y-1/2">
        <h1 className="text-primary-1 font-7xl font-bold select-none">404</h1>
        <h2 className="text-tip-1 text-30 font-bold text-center">{t('tip.noPage')}</h2>

        <Button
          className="btn-primary 
            flex items-center mt-50 px-20 py-10 
            text-18 rounded-8 duration-300"
          onClick={() => router.push('/')}
        >
          <Svg name="arrow-left" className="w-30 mr-10 text-common-1" />
          {t('tip.returnHome')}
        </Button>
      </div>
    </div>
  );
};
