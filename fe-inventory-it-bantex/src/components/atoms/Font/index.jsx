const H1 = ({
  children,
  textColor = "text-slate-800",
  textStyle = "font-normal",
}) => (
  <h1
    className={`${textColor} ${textStyle} text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
  >
    {children}
  </h1>
);

const H2 = ({
  children,
  textColor = "text-slate-800",
  textStyle = "font-normal",
}) => (
  <h2
    className={`${textColor} ${textStyle} text-2xl md:text-3xl lg:text-4xl xl:text-5xl`}
  >
    {children}
  </h2>
);

const H3 = ({
  children,
  textColor = "text-slate-800",
  textStyle = "font-normal",
}) => (
  <h3
    className={`${textColor} ${textStyle} text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
  >
    {children}
  </h3>
);

const H4 = ({
  children,
  textColor = "text-slate-800",
  textStyle = "font-normal",
}) => (
  <h4 className={`${textColor} ${textStyle} text-lg md:text-xl  `}>
    {children}
  </h4>
);

const H5 = ({
  children,
  textColor = "text-slate-800",
  textStyle = "font-normal",
}) => (
  <h5
    className={`${textColor} ${textStyle} text-base md:text-lg lg:text-xl xl:text-2xl`}
  >
    {children}
  </h5>
);

const H6 = ({
  children,
  textColor = "text-slate-800",
  textStyle = "font-normal",
}) => (
  <h6
    className={`${textColor} ${textStyle} text-sm md:text-base lg:text-lg xl:text-xl`}
  >
    {children}
  </h6>
);

const Paragraf = ({
  children,
  textColor = "text-slate-800",
  textStyle = "font-normal",
}) => (
  <p
    className={`${textColor} ${textStyle} text-sm md:text-base lg:text-lg xl:text-xl`}
  >
    {children}
  </p>
);

const Span = ({
  children,
  textColor = "text-slate-800",
  textStyle = "font-normal",
}) => (
  <span
    className={`${textColor} ${textStyle} text-xs md:text-sm lg:text-base xl:text-lg`}
  >
    {children}
  </span>
);

export { H1, H2, H3, H4, H5, H6, Paragraf, Span };
