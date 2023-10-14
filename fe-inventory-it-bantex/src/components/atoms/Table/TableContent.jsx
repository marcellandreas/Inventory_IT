export const TableContent = ({ children }) => {
  return (
    <table className=" backdrop-blur-md bg-opacity-50 overflow-x-auto rounded-3xl">
      {children}
    </table>
  );
};
