const TableContent = ({ children }) => {
  return (
    <table className="backdrop-blur-md bg-opacity-50 overflow-x-auto rounded-3xl">
      {children}
    </table>
  );
};

const Tbody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const Thead = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};
export { TableContent, Tbody, Thead };
