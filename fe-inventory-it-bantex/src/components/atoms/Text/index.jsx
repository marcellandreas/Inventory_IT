const Title = ({ children }) => {
  return (
    <h1 className="text-lg md:text-2xl font-bold  text-slate-800">
      {children}
    </h1>
  );
};

const TitleTable = ({ children }) => {
  return (
    <h3 className=" font-semibold  text-slate-800  text-lg   lg:text-xl">
      {children}
    </h3>
  );
};

export { Title, TitleTable };
