import { useEffect, useState } from "react";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import {
  FormAddModalPcMaster,
  FormDeleteModalPcMaster,
  FormEditModalPcMaster,
  TablePcMasters,
} from "../../components/molecules";
import { AxiosInstance } from "../../apis/api";
import ShowModal from "../../components/organisms/ShowModal";
import PcLine from "../../components/molecules/doc/PcLine";
import DataPc from "../../components/templates/Manage/DataPc";

const PcMaster = () => {
  const [dataPcMaster, setDataPcMaster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  useEffect(() => {
    AxiosInstance.get("/pcmaster")
      .then((res) => {
        setDataPcMaster(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, [isLoading]);

  // state modals in stock
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [components, setComponents] = useState(false);

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <DataPc
            setAddModal={setAddModal}
            setEditModal={setEditModal}
            setDeleteModal={setDeleteModal}
          />
        </LayoutContentDashboard>
      </Sidebar>
      {/* Modals Popup */}
      <ShowModal isVisible={components} onClose={() => setComponents(false)}>
        <PcLine />
      </ShowModal>
      <ShowModal isVisible={addModal} onClose={() => setAddModal(false)}>
        <FormAddModalPcMaster
          onClose={() => setAddModal(false)}
          setIsLoading={setIsLoading}
        />
      </ShowModal>
    </>
  );
};

export default PcMaster;
