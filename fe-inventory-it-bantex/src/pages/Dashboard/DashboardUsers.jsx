import { toast } from "react-toastify";

const DashboardUser = ({ username }) => {
  return (
    <section className=" col-span-6 p-5 bg-white rounded-xl">
      <div>
        <p>
          <span className=" text-red-700 font-bold uppercase">{username}</span>,
          Selamat Datang di Inventory IT
        </p>
        <button></button>
      </div>
    </section>
  );
};

export default DashboardUser;
