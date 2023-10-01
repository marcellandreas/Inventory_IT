// not found in dashboard after login

import { Sidebar } from "../../components/templates";

const NotFoundBeforeLoginPage = () => {
  return (
    <Sidebar>
      <section className="flex justify-center items-center h-full w-full">
        HALAMAN YANG KAMU TUJU BELUM TERSEDIA
      </section>
    </Sidebar>
  );
};

export default NotFoundBeforeLoginPage;
