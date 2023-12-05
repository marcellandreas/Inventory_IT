import welcome from "../../assets/images/welcome.png";

const DashboardUser = ({ username }) => {
  return (
    <section className=" col-span-6 p-5 bg-white rounded-xl">
      <div className=" flex justify-center items-center flex-col">
        <img src={welcome} alt="" className=" " />
        <p>
          <span className=" text-red-700 font-bold uppercase">{username}</span>,
          Selamat Datang di Inventory IT
        </p>
      </div>
    </section>
  );
};

export default DashboardUser;
