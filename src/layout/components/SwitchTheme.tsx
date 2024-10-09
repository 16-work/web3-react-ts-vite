/** Constants */
const options = [
  { label: 'Blue', value: 'theme-light-blue' },
  { label: 'Green', value: 'theme-light-green' },
];

/** Component */
export const SwitchTheme = (props: { className?: string }) => {
  /** Retrieval */
  const { theme, setTheme } = store.global();

  /** Template */
  return (
    <div className={props.className}>
      <DropList value={theme} options={options} onSelect={setTheme} trigger={['hover']} arrow={true} hideDropArrow={true}>
        <Svg name="theme" className="xs:w-50 md:w-40 hover-primary" />
      </DropList>
    </div>
  );
};
