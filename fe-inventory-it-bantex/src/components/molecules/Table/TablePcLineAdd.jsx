import { useState } from "react";
import { AxiosInstance } from "../../../apis/api";
import { BsDatabaseFillAdd } from "../../../assets/icons/icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TablePcLineAdd = ({
  data,
  //   handleGetItemNo,
  //   clickedItems,
  //   setClickedItems,
}) => {
  const role = localStorage.getItem("role");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pc_no = searchParams.get("pc_no");

  const columnNames = [
    "",
    "id",
    "item_no",
    "item_description",
    "unit",
    "brand",
    "note",
    "date_registation",
    "item_specification",
    "post_user_id",
    "post_username",
    "post_date",
  ];
  const tableHeaders =
    role == 1
      ? columnNames
      : columnNames.filter(
          (columnName) =>
            !["post_user_id", "post_username", "post_date"].includes(columnName)
        );

  const [clickedItems, setClickedItems] = useState([]);

  console.log(clickedItems);
  const handleGetItemNo = (itemNo) => {
    if (!clickedItems.includes(itemNo)) {
      setClickedItems([...clickedItems, itemNo]);
    }
  };

  const dets = [
    {
      pc_no: "LAPTOP - ADMIN - 0002",
      item_no: "IT-MRAM3-4GB-0009",
      post_id_user: 1,
      post_username: "admin",
    },
  ];

  // POST METHOD

  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");

  const dataPost = clickedItems.map((item) => ({
    pc_no: pc_no,
    item_no: item,
    post_user_id: idUser,
    post_username: username,
  }));

  //   const dataPostJSON = JSON.stringify(dataPost);
  const handleCreateForm = (e) => {
    e.preventDefault();
    AxiosInstance.post("/pcline", dataPost)
      .then((res) => {
        console.log(res);
        alert("Berhasil Menambah Komponets");
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal Menambah Komponents");
      });
  };
  return (
    <>
      <form onSubmit={handleCreateForm}>
        <button type="submit">Tamba</button>
      </form>
      <table className=" backdrop-blur-md bg-opacity-50 overflow-x-auto rounded-3xl">
        <thead>
          <tr>
            {tableHeaders.map((columnName, index) => (
              <th key={index} className="px-4 py-2">
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((barang, i) => (
            <tr key={i} className="h-5">
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleGetItemNo(barang.item_no)}
                  className="button"
                  disabled={clickedItems.includes(barang.item_no)}
                >
                  <BsDatabaseFillAdd />
                </button>
              </td>
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{barang.item_no}</td>
              <td className="border px-4 py-2">{barang.item_description}</td>
              <td className="border px-4 py-2">{barang.unit}</td>
              <td className="border px-4 py-2">{barang.brand}</td>
              <td className="border px-4 py-2 ">{barang.note}</td>
              <td className="border px-4 py-2">{barang.date_registation}</td>
              <td className="border px-4 py-2">{barang.item_specification}</td>

              {role == 1 ? (
                <>
                  <td className="border px-4 py-2">{barang.post_user_id}</td>
                  <td className="border px-4 py-2">{barang.post_username}</td>
                  <td className="border px-4 py-2">
                    {barang.post_date.slice(0, 10)}
                  </td>
                </>
              ) : role == 2 ? null : null}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablePcLineAdd;
