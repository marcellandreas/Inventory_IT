import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import "./assets/styles/table.css";
import "./assets/styles/modal.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// const GetAllPcMaster = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [id, setId] = useState("");
//   useEffect(() => {
//     AxiosInstance.get("/pcmaster")
//       .then((res) => {
//         setData(res.data.data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         alert("terjadi kesalahan dalam memproses data");
//       });
//   }, [isLoading, data]);

//   return (

//       <Sidebar>
//         <LayoutContentDashboard>
//           <section className="container mx-auto mt-5 flex flex-col gap-5  w-full">
//             {/* Header Kontent */}
//             <section>
//               <button onClick={backToMenu}>
//                 <BsArrowLeftCircleFill className=" text-4xl text-slate-800" />
//               </button>
//             </section>
//             {isLoading ? (
//               <p>Halaman Sedang Memuat Data</p>
//             ) : (
//               <section className="w-[82vw] bg-slate-400 backdrop-blur-md rounded-3xl">
//                 <section className="table__header">
//                   <h1 className=" font-semibold text-md">Tabel Pc Master</h1>
//                   <div className="input-group">
//                     <input
//                       onChange={(e) => {
//                         handleSearch(e);
//                       }}
//                       type="search"
//                       placeholder="Search Data..."
//                     />
//                   </div>
//                   <button
//                     className="button"
//                     onClick={() => {
//                       setAddModal(true);
//                     }}
//                   >
//                     Tambah PC Master
//                   </button>
//                 </section>
//                 <section className="table__body">
//                   <TablePcMasters
//                     data={data}
//                     setId={setId}
//                     setEditModalItem={setEditModal}
//                     setDeleteModalItem={setDeleteModal}
//                   />
//                 </section>
//               </section>
//             )}
//           </section>
//         </LayoutContentDashboard>
//       </Sidebar>

//   );
// };

// const TablePcMasters = ({
//   data,
//   setIdFromPcComponent,
// }) => {
//   return (

//         <tbody>
//           {data.map((barang, i) => (
//             <tr
//               key={i}
//               onClick={() => {
//                 setIdFromPcComponent(barang.id_pc_master);
//               }}
//             >
//               <td className="border px-4 py-2">{i++}</td>
//               <td className="border px-4 py-2">{barang.pc_no}</td>
//               <td className="border px-4 py-2">{barang.pc_description}</td>

//             </tr>
//           ))}
//         </tbody>

//   );
// };

// export default TablePcMasters;
