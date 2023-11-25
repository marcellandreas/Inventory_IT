const Widget = ({ color, border, nameWidget, countWidget, icon }) => {
  return (
    <section className="flex gap-2  hover:scale-105 w-full  col-span-2 sm:col-span-2   lg:col-span-1 ">
      <div
        className={`bg-white hover:scale-110 w-full sm:w-64 ${color}  ${border} border-l-4  min-h-[120px] rounded-lg flex flex-col sm:flex-row items-center px-1 sm:px-6 justify-start sm:justify-between gap-5  sm:gap-0 py-2 sm:py-0`}
      >
        <div className="font-semibold order-2 text-center sm:text-start">
          <p className=" uppercase text-sm sm:text-md ">{nameWidget}</p>
          <h3 className=" text-lg sm:text-3xl ">{countWidget}</h3>
        </div>
        <div className="text-3xl sm:text-5xl order-1">{icon}</div>
      </div>
    </section>
  );
};

export default Widget;
