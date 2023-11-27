const Title = ({ children }) => {
  return (
    <h1 className="text-lg md:text-2xl font-bold  text-slate-800">
      {children}
    </h1>
  );
};

const TitleTable = ({ children, count }) => {
  return (
    <div className=" font-semibold">
      <h3 className="text-slate-800  text-lg   lg:text-xl">{children}</h3>
      <p className=" text-gray-500 text-md">Total: {count}</p>
    </div>
  );
};

export { Title, TitleTable };
