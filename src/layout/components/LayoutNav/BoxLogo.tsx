/** Component */
export const BoxLogo = () => {
  /** Retrieval */

  /** Params */

  /** Actions */

  /** Template */
  return (
    <Link to={path.home} className="logo    flex-align-x cursor-pointer">
      {/* logo */}
      <Svg name="logo" className="logo-icon    xs:w-50 md:w-30" />

      {/* app name */}
      <span className="app-name    xs:ml-16 md:ml-6 font-xl bold">{env.VITE_APPNAME}</span>
    </Link>
  );
};
