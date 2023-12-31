import {
  ContentLayout,
  MainLayout,
  generateDynamicContent,
} from "../../components/templates";
import imgPc from "../../assets/images/pc1.jpeg";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { CustomInput2, SearchInput, Title } from "../../components/atoms";
import { FaLaptopCode } from "react-icons/fa";
import { filterDataBySearch } from "../../helpers/filters";
import imgNotFound from "../../assets/images/data-not-found2.png";
import { showFormattedDate } from "../../helpers/showFormattedDate";

const PersonalComputer = () => {
  const [dataPc, setDataPc] = useState({});
  const [dataItems, setDataItems] = useState([]);
  const id = localStorage.getItem("id_user");
  useEffect(() => {
    AxiosInstance.get(`/pcmaster/personal/${id}`).then((res) => {
      const { data } = res.data;
      setDataPc(data);
      setDataItems(data.items);
    });
  }, [id]);

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = filterDataBySearch(dataItems, search);

  return (
    <MainLayout>
      <ContentLayout>
        <section className="col-span-6 h-screen  relative">
          <img
            src={imgPc}
            style={{ backgroundAttachment: "fixed" }}
            className="w-full h-[50vh]   rounded-md  object-cover overflow-y-auto"
            alt=""
          />
          <section className=" grid grid-flow-dense gap-3 grid-cols-5 w-full md:w-[90%]   absolute top-[60%] md:top-1/2   mx-auto left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            {Object.keys(dataPc).length === 0 ? (
              <div className=" col-span-5 border flex justify-center items-center flex-col border-y-black   cards p-4 w-full min-h-[50vh] md:h-[30vh]">
                <img src={imgNotFound} alt="" className=" h-full" />
                <span className="font-bold">Data Tidak Tersedia</span>
              </div>
            ) : (
              <div className=" col-span-5 border border-y-black   cards p-3 w-full">
                <Title>My Computer</Title>
                <div className="grid  grid-flow-dense gap-2  grid-cols-2 sm:grid-cols-2 md:grid-cols-4  ">
                  <div className="gap-2 flex flex-col col-span-1">
                    <label className="flex items-center gap-2">
                      <FaLaptopCode />
                      Kode
                    </label>
                    <input
                      className=" bg-gray-100 border border-gray-300"
                      type="text"
                      defaultValue={dataPc?.pc_no}
                      readOnly
                    />
                  </div>
                  <CustomInput2
                    label="Deskripsi"
                    className={`gap-2 flex flex-col col-span-1`}
                    readOnly={true}
                    value={dataPc?.pc_description}
                  />
                  <CustomInput2
                    label="Satuan"
                    className={`gap-2 flex flex-col col-span-1`}
                    value={dataPc?.unit}
                    readOnly={true}
                  />
                  <CustomInput2
                    label="Kategori"
                    className={`gap-2 flex flex-col col-span-1`}
                    value={dataPc?.category}
                    readOnly={true}
                  />
                  <CustomInput2
                    label="Lokasi Pc"
                    className={`gap-2 flex flex-col col-span-1`}
                    value={dataPc?.pc_location}
                    readOnly={true}
                  />
                  <CustomInput2
                    label="Status"
                    readOnly={true}
                    className={`gap-2 flex flex-col col-span-1`}
                    value={dataPc?.status}
                  />
                  <CustomInput2
                    label="Tanggal Regis"
                    readOnly={true}
                    className={`gap-2 flex flex-col col-span-1`}
                    value={`${
                      showFormattedDate(dataPc?.date_registation) || "-"
                    }`}
                  />
                  <CustomInput2
                    label="Tanggal Ex (Rusak)"
                    readOnly={true}
                    className={`gap-2 flex flex-col col-span-1`}
                    value={`${showFormattedDate(dataPc?.date_expired) || "-"}`}
                  />

                  <div className="gap-2 flex flex-col col-span-1 row-span-2">
                    <label>Catatan (jika ada)</label>
                    <textarea
                      className="bg-gray-100 border border-gray-300 h-[120px]"
                      readOnly
                      defaultValue={dataPc?.note}
                    />
                  </div>

                  <CustomInput2
                    label="Spesifikasi"
                    readOnly={true}
                    className={`gap-2 flex flex-col col-span-1`}
                    value={dataPc?.pc_spectification}
                  />
                </div>
              </div>
            )}
          </section>
          {/* </div> */}
          <div className="w-full p-0 md:p-16  min-h-[20px]">
            <div className="mt-[50vh] sm:mt-[40vh] md:mt-[20vh] overflow-x-auto  col-span-5 border border-y-black cards p-3 ">
              <div className=" flex justify-between w-full mb-3">
                <Title>komponen Pc</Title>
                <div>
                  <SearchInput search={search} onChange={handleSearchChange} />
                </div>
              </div>
              <div className=" overflow-scroll overflow-x-auto personal__computer">
                {generateDynamicContent(
                  dataItems,
                  filteredData,
                  <>
                    {filteredData.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border-slate-800 border-b-2 min-w-min flex gap-y-2 gap-x-2  p-1 mt-1  rounded-md text-md  "
                      >
                        <div className="flex flex-col min-w-[192px]">
                          <div className="text-gray-500">kode</div>
                          <div className="text-slate-800">{item.item_no}</div>
                        </div>
                        <div className=" flex flex-col min-w-[288px] ">
                          <h2 className=" font-semibold text-gray-500">
                            Keterangan
                          </h2>
                          <p>{item.item_description}</p>
                          <div className="flex flex-wrap gap-x-2 text-slate-800">
                            <p>
                              Brand: <span>{item.brand}</span>
                            </p>
                            <p>
                              Status: <span>{item.status}</span>
                            </p>
                            <p>
                              Kondisi: <span>{item.kondisi}</span>
                            </p>
                            <p>
                              Kategory: <span>{item.category}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col min-w-[240px]">
                          <div className="text-gray-500">Note</div>
                          <p className="text-slate-800">{item.note}</p>
                        </div>
                        <div className="flex flex-col min-w-[224px]">
                          <div className="text-gray-500">Timeline</div>
                          <p className="text-slate-800">
                            Tgl Registrasi :{" "}
                            {showFormattedDate(item.date_registation)}
                          </p>
                          <p className="text-slate-800">
                            Tgl Exp : {item.date_expired}
                          </p>
                        </div>
                        <div className="flex flex-col  min-w-[192px]">
                          <div className="text-gray-500">Spesifikasi</div>
                          <p className="text-slate-800">
                            {item.item_spesification}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </ContentLayout>
    </MainLayout>
  );
};

export default PersonalComputer;
