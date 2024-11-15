import { FOOTER_LINKS } from '@/constants/common';

/** Component */
export const LayoutFooter = () => {
  /** Retrieval */
  const { t, i18n } = useTranslation();

  /** Params */
  const icons = useMemo(() => {
    return [
      {
        label: 'X',
        icon: 'x',
        href: FOOTER_LINKS.X[i18n.language],
      },
      {
        label: 'discord',
        icon: 'discord',
        href: FOOTER_LINKS.DISCORD[i18n.language],
      },
      {
        label: 'telegram',
        icon: 'telegram',
        href: FOOTER_LINKS.TELEGRAM[i18n.language],
      },
      {
        label: 'github',
        icon: 'github',
        href: FOOTER_LINKS.GITHUB[i18n.language],
      },
      {
        label: 'gitbook',
        icon: 'gitbook',
        href: FOOTER_LINKS.GITBOOK[i18n.language],
      },
    ];
  }, [i18n.language]);

  /** Template */
  return (
    <div>
      {/* hr */}
      <div className="hr-1 mt-20 mb-30"></div>

      {/* main */}
      <div className="w !my-0 xs:pb-40 md:pb-30">
        {/* icons */}
        <div
          className="w-fit grid gap-x-60 m-auto"
          style={{
            gridTemplateColumns: `repeat(${icons.length}, minmax(0, 1fr))`,
          }}
        >
          {icons.map((item) => (
            <a key={item.label} href={item.href} target="_blank">
              <Svg name={item.icon} className="xs:w-60 md:w-40 text-common-1 hover-primary" />
            </a>
          ))}
        </div>

        {/* copyright */}
        <p className="mt-10 text-tip-1 font-base text-center">
          © 2024 {env.VITE_APPNAME}
          {t('common.allRightsReserved')}
        </p>
      </div>
    </div>
  );
};
