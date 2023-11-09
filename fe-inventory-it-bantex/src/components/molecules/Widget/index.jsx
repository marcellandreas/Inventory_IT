import { MdPeopleAlt } from "react-icons/md";

const Widget = ({ color, border, nameWidget, countWidget, icon }) => {
  // const menuWidget = [
  //   {
  //     name: "Jumlah Stocks",
  //     jumlah: 10,
  //     icon: <MdPeopleAlt />,
  //     color: "text-blue-600",
  //     border: "border-blue-600",
  //   },
  //   {
  //     name: "Jumlah Users",
  //     jumlah: 10,
  //     icon: <MdPeopleAlt />,
  //     color: "text-green-600",
  //     border: "border-green-600",
  //   },
  //   {
  //     name: "Jumlah Users",
  //     jumlah: 10,
  //     icon: <MdPeopleAlt />,
  //     color: "text-red-600",
  //     border: "border-red-600",
  //   },
  //   {
  //     name: "Jumlah Users",
  //     jumlah: 10,
  //     icon: <MdPeopleAlt />,
  //     color: "text-yellow-600",
  //     border: "border-yellow-600",
  //   },
  // ];
  return (
    <section className="flex gap-2 hover:scale-105  justify-between flex-wrap col-span-4 sm:col-span-2   lg:col-span-1">
      <div
        className={`bg-white w-64 ${color}  ${border} border-l-4  min-h-[120px] rounded-lg flex items-center px-6 justify-between `}
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
