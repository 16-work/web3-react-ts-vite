/** Constants */
// 自动获取主题选项
const themes = import.meta.glob('@/assets/theme/*.scss');
const options = Object.keys(themes)
  .filter((filePath) => !filePath.endsWith('default.scss'))
  .map((filePath) => {
    const fileName = filePath.split('/').pop()?.replace('.scss', '');
    const label = fileName!.split('-').pop()!; // 取最后一个 '-' 后的内容
    return { label: label?.charAt(0).toUpperCase() + label?.slice(1), value: fileName };
  });

/** Component */
export const SwitchTheme = (props: { className?: string }) => {
  /** Retrieval */
  const { theme, setTheme } = store.global();

  /** Template */
  return (
    options.length > 1 && (
      <div className={props.className}>
        <DropList value={theme} options={options} onSelect={setTheme} trigger={['hover']} arrow={true} hideDropArrow={true}>
          <Svg name="theme" className="layout-nav-icon-w hover-primary" />
        </DropList>
      </div>
    )
  );
};
