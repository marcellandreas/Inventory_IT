import { useSelector } from "react-redux";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import TablePcLineAdd from "../../components/molecules/Table/TablePcLineAdd";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

const AddComponentsPC = () => {
  const dataUnused = useSelector((state) => state.dataPc.dataItemsUnused);
  // const { pc_no } = useParams();

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

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="container mx-auto  flex flex-col gap-5  w-full">
          {/* Header Kontent */}
          <section className="flex justify-between ">
            <button className="">
              <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
            </button>
          </section>
          <section className="p-2">
            {/* <h2>Item yang telah diklik:</h2> */}
            {/* <ul className="flex gap-2  flex-wrap">
              {clickedItems.map((itemNo, index) => (
                <li
                  className="p-2 flex justify-between bg-slate-700 text-white w-48 rounded-md "
                  key={index}
                >
                  {itemNo}
                  <button onClick={() => handleItemRemove(itemNo)}>X</button>
                </li>
              ))}
            </ul> */}
          </section>

          <section className="w-[82vw] bg-slate-400 backdrop-blur-md rounded-3xl">
            <section className="table__header">
              <h1 className=" font-semibold text-md">
                Tabel Komponen Tersedia {pc_no}
              </h1>
              <div className="input-group">
                <input type="search" placeholder="Search Data..." />
              </div>
            </section>
            <section className="table__body">
              <TablePcLineAdd
                data={dataUnused}
                // handleGetItemNo={handleGetItemNo}
                // clickedItems={clickedItems}
                // setClickedItems={setClickedItems}
              />
            </section>
          </section>
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default AddComponentsPC;
