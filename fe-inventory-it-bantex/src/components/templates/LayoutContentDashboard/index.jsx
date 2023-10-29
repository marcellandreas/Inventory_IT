const LayoutContentDashboard = ({ children }) => {
  return (
    <section className="max-h-[80vh] md:max-h-[80vh] overflow-hidden p-5 overflow-y-auto ">
      {children}
    </section>
  );
};

export default LayoutContentDashboard;
