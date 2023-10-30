import { useDispatch, useSelector } from "react-redux";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import TablePcLineAdd from "../../components/molecules/Table/TablePcLineAdd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { TableBody, TableHeader } from "../../components/organisms";
import { SearchInput, TitleTable } from "../../components/atoms";
import { filterDataBySearch } from "../../helpers/filters";
import {
  createPcLine,
  fetchItemsUnusedForPcMaster,
} from "../../Redux/Feature/DataPcMaster";

const AddComponentsPC = () => {
  const dispatch = useDispatch();

  const dataUnused = useSelector((state) => state.pcmaster.dataUnused);

  useEffect(() => {
    dispatch(fetchItemsUnusedForPcMaster());
  }, [dispatch]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pc_no = searchParams.get("pc_no");

  const [clickedItems, setClickedItems] = useState([]);
  const handleGetItemNo = (itemNo) => {
    if (!clickedItems.includes(itemNo)) {
      setClickedItems([...clickedItems, itemNo]);
    }
  };

  const handleItemRemove = (itemNo) => {
    // Hapus itemNo dari clickedItems
    const updatedItems = clickedItems.filter((item) => item !== itemNo);
    setClickedItems(updatedItems);
  };

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate("/pc-master");
  };

  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const dataPost = clickedItems.map((item) => ({
    pc_no: pc_no,
    item_no: item,
    post_user_id: idUser,
    post_username: username,
  }));

  console.log(clickedItems);

  const loadingPcLine = useSelector((state) => state.pcmaster.loadingPcLine);

  const handleCreateForm = async (e) => {
    e.preventDefault();
    if (loadingPcLine) {
      console.log("berhasil");
    } else {
      dispatch(createPcLine(dataPost));
      navigate(-1);
    }
  };

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataUnused, search);

  return (
    <>
      <Sidebar>
        <LayoutContentDashboard>
          <section className="container mx-auto  flex flex-col gap-5  w-full">
            {/* Header Kontent */}
            <section className="flex gap-2 ">
              <button className="" onClick={backToMenu}>
                <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
              </button>
              <form onSubmit={handleCreateForm}>
                <button
                  type="submit"
                  className="button disabled:bg-slate-300 disabled:text-black disabled:font-semibold"
                  disabled={clickedItems.length === 0}
                >
                  Tambah Komponen
                </button>
              </form>
            </section>
            <section className="p-2">
              {/* <h2>Item yang telah diklik:</h2> */}
              <ul className="flex gap-2  flex-wrap">
                {clickedItems.map((itemNo, index) => (
                  <li
                    className="p-2 flex justify-between bg-slate-700 text-white w-48 rounded-md "
                    key={index}
                  >
                    {itemNo}
                    <button onClick={() => handleItemRemove(itemNo)}>X</button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="w-[82vw] bg-slate-400 backdrop-blur-md rounded-3xl">
              <TableHeader>
                <TitleTable>Data Komponen Tersedia </TitleTable>
                <SearchInput
                  search={search}
                  handleSearchChange={handleSearchChange}
                />
              </TableHeader>
              <TableBody>
                <TablePcLineAdd
                  data={filteredData}
                  backToMenu={backToMenu}
                  handleGetItemNo={handleGetItemNo}
                  clickedItems={clickedItems}
                  setClickedItems={setClickedItems}
                />
              </TableBody>
            </section>
          </section>
        </LayoutContentDashboard>
      </Sidebar>
    </>
  );
};

export default AddComponentsPC;
