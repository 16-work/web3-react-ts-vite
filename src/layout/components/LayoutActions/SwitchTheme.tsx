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
    options.length > 1 && (
      <div className={props.className}>
        <DropList value={theme} options={options} onSelect={setTheme} children={() => <Svg name="theme" className="xs:w-60 md:w-30 hover-primary" />} />
      </div>
    )
  );
};
