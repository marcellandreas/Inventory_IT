import { useDispatch, useSelector } from "react-redux";
import { MainLayout, ContentLayout } from "../../components/templates";

import { BsArrowLeftCircleFill, BsDatabaseFillAdd } from "react-icons/bs";
import TablePcLineAdd from "../../components/molecules/Table/TablePcLineAdd";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { TableBody, TableHeader } from "../../components/organisms";
import { SearchInput, TitleTable } from "../../components/atoms";
import { filterDataBySearch } from "../../helpers/filters";
import { createPcLine } from "../../Redux/Feature/DataPcMaster";
import { useFetchItemsUnusedForPcMaster } from "../../config/GetData";

const AddComponentsPC = () => {
  const dispatch = useDispatch();

  const dataUnused = useFetchItemsUnusedForPcMaster();

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
  console.log(clickedItems);
  return (
    <>
      <MainLayout>
        <ContentLayout>
          {/* Header Kontent */}
          <section className="flex gap-2 justify-between col-span-6 ">
            <button className="" onClick={backToMenu}>
              <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
            </button>
            {clickedItems.length >= 1 ? (
              <form onSubmit={handleCreateForm}>
                <button
                  type="submit"
                  className="button disabled:bg-slate-300 disabled:text-black disabled:font-semibold"
                  disabled={clickedItems.length === 0}
                >
                  Tambah Komponen
                </button>
              </form>
            ) : null}
          </section>
          <section className="p-2 border border-slate-800 rounded-md col-span-6">
            {clickedItems.length >= 1 ? (
              <h2>List Item Yang di pilih: </h2>
            ) : null}
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
            {clickedItems.length !== 0 ? null : (
              <p className="flex gap-2 items-center  text-sm">
                Klik Icon
                <span>
                  <BsDatabaseFillAdd />
                </span>
                jika ingin menambahkan
              </p>
            )}
          </section>

          <section className="w-[82vw] bg-slate-400 backdrop-blur-md rounded-3xl col-span-6">
            <TableHeader>
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
        </ContentLayout>
      </MainLayout>
    </>
  );
};

export default AddComponentsPC;
