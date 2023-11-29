const TableBody = ({ children }) => {
  return <section className="table__body">{children}</section>;
};

const TableHeader = ({ children }) => {
  return (
    <section className="table__header bg-gray-300 rounded-xl  ">
      {children}
    </section>
  );
};

export { TableBody, TableHeader };
