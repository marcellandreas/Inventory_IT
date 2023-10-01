const Title = ({ children }) => {
  return (
    <div>
      <h1 className="text-3xl text-slate-600 mb-2">{children}</h1>
      <hr />
    </div>
  );
};

export default Title;
