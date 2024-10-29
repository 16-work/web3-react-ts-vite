/** Props */
interface Props {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/** Component
 * 上中下布局，且中部撑满剩余部分的盒子
 */
export const BoxOreo = (props: Props) => {
  return (
    <div
      className={`w-full h-screen flex flex-col
        ${props.className}
      `}
    >
      {/* header */}
      {props.header}

      {/* main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* body */}
        {props.children}

        {/* footer */}
        {props.footer}
      </main>
    </div>
  );
};
