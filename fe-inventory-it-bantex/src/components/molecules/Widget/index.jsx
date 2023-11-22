const Widget = ({ color, border, nameWidget, countWidget, icon }) => {
  return (
    <section className="flex gap-2  hover:scale-105 w-full  col-span-3 sm:col-span-2   lg:col-span-1 ">
      <div
        className={`bg-white hover:scale-110 w-full sm:w-64 ${color}  ${border} border-l-4  min-h-[120px] rounded-lg flex items-center px-6 justify-between `}
      >
        <div className="font-semibold">
          <p className=" uppercase text-md ">{nameWidget}</p>
          <h3 className="text-3xl">{countWidget}</h3>
        </div>
        <div className="text-5xl">{icon}</div>
      </div>
    </section>
  );
};

export default Widget;
