/** Component */
export const PageNotFound = () => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Template */
  return (
    <div className="w h-450">
      <div className="flex flex-col items-center relative top-1/2 -translate-y-1/2">
        <h1 className="text-primary-1 text-70 font-bold select-none">404</h1>
        <h2 className="text-tip-1 font-2xl font-bold text-center">{t('tip.noPage')}</h2>

        <Button
          className="btn-primary 
            flex items-center mt-50 px-20 py-10 
            font-lg rounded-8 duration-300"
          onClick={() => router.push('/')}
        >
          <Svg name="arrow-left" className="xs:w-40 md:w-30 mr-10 text-common-1" />
          {t('tip.returnHome')}
        </Button>
      </div>
    </div>
  );
};
