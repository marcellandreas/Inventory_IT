const ContentLayout = ({ children }) => {
  return (
    <section className="max-h-[95vh] md:max-h-[80vh] overflow-hidden grid grid-cols-6 gap-4 grid-flow-dense w-full p-5 overflow-y-auto ">
      {children}
    </section>
  );
};

export default ContentLayout;
