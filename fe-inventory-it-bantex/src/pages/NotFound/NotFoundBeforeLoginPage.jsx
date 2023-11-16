// not found in dashboard after login

import { MainLayout } from "../../components/templates";

const NotFoundBeforeLoginPage = () => {
  return (
    <MainLayout>
      <section className="flex justify-center items-center h-full w-full">
        HALAMAN YANG KAMU TUJU BELUM TERSEDIA
      </section>
    </MainLayout>
  );
};

export default NotFoundBeforeLoginPage;
