import { FOOTER_LINKS } from '@/constants/common';

/** Component */
export const Support = () => {
  /** Retrieval */

  /** Params */
  const icons = useMemo(() => {
    return [
      {
        label: 'X',
        icon: 'x',
        href: FOOTER_LINKS.X['en'],
      },
      {
        label: 'telegram',
        icon: 'telegram',
        href: FOOTER_LINKS.TELEGRAM['en'],
      },
      {
        label: 'discord',
        icon: 'discord',
        href: FOOTER_LINKS.DISCORD['en'],
      },
      {
        label: 'github',
        icon: 'github',
        href: FOOTER_LINKS.GITHUB['en'],
      },
      {
        label: 'gitbook',
        icon: 'gitbook',
        href: FOOTER_LINKS.GITBOOK['en'],
      },
    ];
  }, []);

  /** Template */
  return (
    <div style={{ gridTemplateColumns: `repeat(${icons.length}, minmax(0, 1fr))` }} className="w-fit grid gap-x-37">
      {icons.map((item) => (
        <a key={item.label} href={item.href} target="_blank" className="xs:w-66 md:w-44 flex-align-x justify-center rounded-6">
          <Svg name={item.icon} className="w-full hover-primary" />
        </a>
      ))}
    </div>
  );
};
