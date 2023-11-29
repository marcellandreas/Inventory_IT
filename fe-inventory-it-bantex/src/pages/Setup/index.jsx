import { MdAdd, MdArrowLeft, MdDelete, MdEdit } from "react-icons/md";
import {
  CustomInput2,
  CustomSelect2,
  SearchInput,
  TableContent,
  Tbody,
  Thead,
  Title,
  TitleTable,
} from "../../components/atoms";
import { TableBody, TableHeader } from "../../components/organisms";
import { ContentLayout, MainLayout } from "../../components/templates";
import {
  useFetchCategories,
  useFetchCategoriesId,
  useFetchDataCategories,
  useFetchPt,
  useFetchPtId,
} from "../../config/GetData";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDivision,
  fetchDivisionId,
  fetchPt,
} from "../../Redux/Feature/DivPtSlice";
import { fetchDataCategories } from "../../Redux/Feature/categoriesSlice";
import { filterDataBySearch } from "../../helpers";
import { toast } from "react-toastify";

const SetUp = () => {
  const dispatch = useDispatch();
  // form input
  const [idCategory, setIdCategory] = useState(null);
  const [category, setCategory] = useState("");
  const categories = useFetchCategories();
  const dataCategories = useFetchDataCategories();
  const categoriesId = useFetchCategoriesId(idCategory);
  useEffect(() => {
    setCategoryEdit(categoriesId.category);
  }, [idCategory, categoriesId]);
  const [categoryEdit, setCategoryEdit] = useState("");

  const dataPt = useFetchPt();
  const [namePt, setNamePt] = useState("");
  const [idNamePt, setIdNamePt] = useState(null);
  const namePtId = useFetchPtId(idNamePt);
  const [namePtEdit, setNamePtEdit] = useState("");
  useEffect(() => {
    setNamePtEdit(namePtId.name_pt);
  }, [idNamePt, namePtId]);

  const [dataChangePt, setDataChangePt] = useState(null);
  useEffect(() => {
    if (dataPt) {
      setDataChangePt(dataPt[0]?.name_pt);
    }
  }, [dataPt]);
  const [idDivision, setIdDivision] = useState(null);

  const dataDivisionId = useSelector((state) => state.divPt.dataDivisionId);
  const [formValuesDiv, setFormValuesDiv] = useState({
    name_pt: "",
    name_division: "",
  });
  console.log(formValuesDiv);
  useEffect(() => {
    const getDataDivision = async () => {
      if (initialCardState.showCardDivEdit === true || idDivision !== null) {
        await dispatch(fetchDivisionId(idDivision));
        console.log("bekerja");
      } else {
        console.log("tiddak bekerja");
      }
    };
    getDataDivision();
  }, [idDivision]);
  const division = useSelector((state) => state.divPt.dataDivision);
  console.log(division);
  useEffect(() => {
    setFormValuesDiv((prevFormValuesDiv) => ({
      ...prevFormValuesDiv,
      name_pt: dataDivisionId.name_pt,
      name_division: dataDivisionId.name_division,
    }));
  }, [idDivision, dataDivisionId]);
  useEffect(() => {
    if (idDivision === null) {
      setFormValuesDiv((prevFormValuesDiv) => ({
        ...prevFormValuesDiv,
        name_pt: "",
        name_division: "",
      }));
    }
  }, [idDivision]);

  useEffect(() => {
    const getDivision = async () => {
      await dispatch(fetchDivision(dataChangePt));
    };
    getDivision();
  }, [dataChangePt]);

  const onSubmitCategory = () => {
    AxiosInstance.post("/categories", { category: category })
      .then((res) => {
        alert("berhasil");
        dispatch(fetchDataCategories());
        setCategory("");
      })
      .catch((err) => console.log(err));
  };
  const onUpdateCategory = () => {
    AxiosInstance.put(`/categories/${idCategory}`, { category: categoryEdit })
      .then((res) => {
        alert("berhasil");
        dispatch(fetchDataCategories());
      })
      .catch((err) => console.log(err));
  };
  const onDeleteCategory = () => {
    AxiosInstance.delete(`/categories/${idCategory}`)
      .then((res) => {
        alert("berhasil");
        dispatch(fetchDataCategories());
      })
      .catch((err) => console.log(err));
  };

  const onSubmitPt = () => {
    AxiosInstance.post("/app/pt", { name_pt: namePt })
      .then((res) => {
        alert("berhasil");
        dispatch(fetchPt());
      })
      .catch((err) => console.log(err));
  };
  const onUpdatePt = () => {
    AxiosInstance.put(`/app/pt/${idNamePt}`, { name_pt: namePtEdit })
      .then((res) => {
        alert("berhasil");
        dispatch(fetchPt());
      })
      .catch((err) => console.log(err));
  };
  const onDeletePt = () => {
    AxiosInstance.delete(`/app/pt/${idNamePt}`)
      .then((res) => {
        alert("berhasil");
        dispatch(fetchPt());
      })
      .catch((err) => console.log(err));
  };

  // State untuk mengelola status card
  const initialCardState = {
    showCard: false,
    showCardPt: false,
    showCardDiv: false,
    showCardEdit: false,
    showCardPtEdit: false,
    showCardDivEdit: false,
    showCardDel: false,
    showCardPtDel: false,
    showCardDivDel: false,
  };
  const [cardState, setCardState] = useState(initialCardState);

  const onSubmitDIv = () => {
    AxiosInstance.post("/app/division", formValuesDiv)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(fetchDivision(dataChangePt));
      })
      .catch((err) => console.log(err));
  };
  const onUpdateDiv = () => {
    AxiosInstance.put(`/app/division/${idDivision}`, formValuesDiv)
      .then((res) => {
        alert("berhasil");
        dispatch(fetchDivision(dataChangePt));
      })
      .catch((err) => console.log(err));
  };
  const onDeleteDiv = () => {
    AxiosInstance.delete(`/app/division/${idDivision}`)
      .then((res) => {
        alert("berhasil");
        dispatch(fetchDivision(dataChangePt));
      })
      .catch((err) => console.log(err));
  };

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredDataCategories = filterDataBySearch(dataCategories, search);
  console.log(formValuesDiv);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const isCardVisible =
    cardState.showCard ||
    cardState.showCard ||
    cardState.showCardEdit ||
    cardState.showCardDel ||
    cardState.showCardPt ||
    cardState.showCardPtDel ||
    cardState.showCardPtEdit ||
    cardState.showCardDiv ||
    cardState.showCardDivEdit ||
    cardState.showCardDivDel;

  const styleShowCard = "col-span-12 sm:col-span-6 cards p-2";
  return (
    <MainLayout>
      <ContentLayout>
        <section className=" col-span-6 grid grid-flow-dense grid-cols-12 gap-3">
          <section
            className={`col-span-12 sm:col-span-${isCardVisible ? "6" : "12"}`}
          >
            <Title>Settings</Title>
          </section>
          {cardState.showCard && (
            <div className={styleShowCard}>
              <TitleTable>Tambah Categories</TitleTable>
              <div className="flex gap-2 ">
                <CustomInput2
                  type="text"
                  placeholder="Masukan Nama Categories"
                  className="flex-1 capitalize"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onSubmitCategory();
                    setCardState({ ...initialCardState, showCard: false });
                  }}
                >
                  Tambahkan
                </button>
              </div>
            </div>
          )}
          {cardState.showCardEdit && (
            <div className={styleShowCard}>
              <TitleTable>Edit Categories</TitleTable>
              <div className="flex gap-2 ">
                <CustomInput2
                  type="text"
                  placeholder="Masukan Nama Categories"
                  className="flex-1"
                  value={categoryEdit}
                  onChange={(e) => setCategoryEdit(e.target.value)}
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onUpdateCategory();
                    setCardState({ ...initialCardState, showCardEdit: false });
                  }}
                >
                  Ya, Edit
                </button>
              </div>
            </div>
          )}
          {cardState.showCardDel && (
            <div className={styleShowCard}>
              <TitleTable>Delete Categories</TitleTable>
              <div className="flex gap-2 ">
                <CustomInput2
                  type="text"
                  value={categoryEdit}
                  className="flex-1"
                  readOnly={true}
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onDeleteCategory();
                    setCardState({ ...initialCardState, showCardDel: false });
                  }}
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          )}
          {cardState.showCardPt && (
            <div className={styleShowCard}>
              <TitleTable>Tambah PT</TitleTable>
              <div className="flex gap-2 ">
                <CustomInput2
                  type="text"
                  placeholder="Masukan Nama PT"
                  className="flex-1"
                  value={namePt}
                  onChange={(e) => setNamePt(e.target.value)}
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onSubmitPt();
                    setCardState({ ...initialCardState, showCardPt: false });
                  }}
                >
                  Tambahkan
                </button>
              </div>
            </div>
          )}
          {cardState.showCardPtEdit && (
            <div className={styleShowCard}>
              <TitleTable>Edit PT</TitleTable>
              <div className="flex gap-2 ">
                <CustomInput2
                  type="text"
                  placeholder="Masukan Nama PT"
                  className="flex-1"
                  value={namePtEdit}
                  onChange={(e) => setNamePtEdit(e.target.value)}
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onUpdatePt();
                    setCardState({
                      ...initialCardState,
                      showCardPtEdit: false,
                    });
                  }}
                >
                  Ya, Edit
                </button>
              </div>
            </div>
          )}
          {cardState.showCardPtDel && (
            <div className={styleShowCard}>
              <TitleTable>Delete Pt</TitleTable>
              <div className="flex gap-2 ">
                <CustomInput2
                  type="text"
                  value={namePtEdit}
                  className="flex-1"
                  readOnly={true}
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onDeletePt();
                    setCardState({
                      ...initialCardState,
                      showCardPtDel: false,
                    });
                  }}
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          )}
          {cardState.showCardDiv && (
            <div className={styleShowCard}>
              <TitleTable>Tambah Division</TitleTable>
              <div className="flex gap-2 ">
                <CustomSelect2
                  options={[
                    <option value="" disabled selected>
                      Pilih Bagian Pt
                    </option>,
                    ...dataPt.map((data, i) => (
                      <option key={i} defaultValue={data.name_pt}>
                        {data.name_pt}
                      </option>
                    )),
                  ]}
                  name="name_pt"
                  className="flex-1"
                  value={formValuesDiv.name_pt}
                  onChange={(e) =>
                    setFormValuesDiv({
                      ...formValuesDiv,
                      name_pt: e.target.value,
                    })
                  }
                />
                <CustomInput2
                  type="text"
                  placeholder="Masukan Nama Division"
                  className="flex-1"
                  name="name_division"
                  value={formValuesDiv.name_division}
                  onChange={(e) =>
                    setFormValuesDiv({
                      ...formValuesDiv,
                      name_division: e.target.value,
                    })
                  }
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onSubmitDIv();
                    setCardState({
                      ...initialCardState,
                      showCardDiv: false,
                    });
                    setIdDivision(null);
                  }}
                >
                  Tambahkan
                </button>
              </div>
            </div>
          )}
          {cardState.showCardDivEdit && (
            <div className={styleShowCard}>
              <TitleTable>Edit Division</TitleTable>
              <div className="flex gap-2 ">
                <CustomSelect2
                  options={[
                    <option value="" disabled selected>
                      Pilih Bagian Pt
                    </option>,
                    ...dataPt.map((data, i) => (
                      <option key={i} defaultValue={data.name_pt}>
                        {data.name_pt}
                      </option>
                    )),
                  ]}
                  name="name_pt"
                  className="flex-1"
                  value={formValuesDiv.name_pt}
                  onChange={(e) =>
                    setFormValuesDiv({
                      ...formValuesDiv,
                      name_pt: e.target.value,
                    })
                  }
                />
                <CustomInput2
                  type="text"
                  placeholder="Masukan Nama Division"
                  className="flex-1"
                  name="name_division"
                  value={formValuesDiv.name_division}
                  onChange={(e) =>
                    setFormValuesDiv({
                      ...formValuesDiv,
                      name_division: e.target.value,
                    })
                  }
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onUpdateDiv();
                    setCardState({
                      ...initialCardState,
                      showCardDivEdit: false,
                    });
                  }}
                >
                  ya, Edit
                </button>
              </div>
            </div>
          )}
          {cardState.showCardDivDel && (
            <div className={styleShowCard}>
              <TitleTable>Delete Pt</TitleTable>
              <div className="flex gap-2 ">
                <CustomInput2
                  value={formValuesDiv.name_pt}
                  className="flex-1"
                  readOnly={true}
                />
                <CustomInput2
                  value={formValuesDiv.name_division}
                  className="flex-1"
                  readOnly={true}
                />
                <button
                  className="button place-self-end"
                  onClick={() => {
                    onDeleteDiv();
                    setCardState({
                      ...initialCardState,
                      showCardDivDel: false,
                    });
                  }}
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          )}
          <section className="col-span-12 max-h-[60vh] sm:max-h-[80vh] sm:col-span-4 cards p-2">
            <TableHeader>
              <TitleTable count={dataCategories.length}>Categories</TitleTable>
              <SearchInput search={search} onChange={handleSearchChange} />

              <button
                className="button order-2"
                onClick={() =>
                  setCardState({
                    ...initialCardState,
                    showCard: !cardState.showCard,
                  })
                }
              >
                <MdAdd />
              </button>
            </TableHeader>
            <TableBody>
              <TableContent>
                <Thead>
                  <th>ID</th>
                  <th>Name Categories</th>
                  <th>Actions</th>
                </Thead>
                {filteredDataCategories.map((data, i) => {
                  return (
                    <Tbody key={i}>
                      <tr>
                        <td className="border">{`${i + 1}.`}</td>
                        <td className=" border ">{data.category}</td>
                        <td className="border  flex gap-1 place-content-center">
                          <button
                            className=" button_edit"
                            onClick={() => {
                              setIdCategory(data.id_category);
                              setCardState({
                                ...initialCardState,
                                showCardEdit: !cardState.showCardEdit,
                              });
                            }}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className="button_delete"
                            onClick={() => {
                              setIdCategory(data.id_category);

                              setCardState({
                                ...initialCardState,
                                showCardDel: !cardState.showCardDel,
                              });
                            }}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    </Tbody>
                  );
                })}
              </TableContent>
            </TableBody>
          </section>
          <section className=" col-span-12 max-h-[60vh] sm:max-h-[80vh] sm:col-span-4 cards p-2">
            <TableHeader>
              <TitleTable>PT</TitleTable>
              <button
                className="button"
                onClick={() => {
                  setCardState({
                    ...initialCardState,
                    showCardPt: !cardState.showCardPt,
                  });
                }}
              >
                <MdAdd />
              </button>
            </TableHeader>
            <TableBody>
              <TableContent>
                <Thead>
                  <th>ID</th>
                  <th>Name PT</th>
                  <th>Actions</th>
                </Thead>
                {dataPt.map((data, i) => {
                  return (
                    <Tbody key={i}>
                      <tr>
                        <td className="border">{`${i + 1}.`}</td>
                        <td className=" border ">{data.name_pt}</td>
                        <td className="border  flex gap-1 place-content-center">
                          <button
                            className=" button_edit"
                            onClick={() => {
                              setIdNamePt(data.id_pt);
                              setCardState({
                                ...initialCardState,
                                showCardPtEdit: !cardState.showCardPtEdit,
                              });
                            }}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className="button_delete"
                            onClick={() => {
                              setIdNamePt(data.id_pt);
                              setCardState({
                                ...initialCardState,
                                showCardPtDel: !cardState.showCardPtDel,
                              });
                            }}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    </Tbody>
                  );
                })}
              </TableContent>
            </TableBody>
          </section>
          <section className=" col-span-12 max-h-[60vh] sm:max-h-[80vh] sm:col-span-4 cards p-2">
            <TableHeader>
              <TitleTable>Division</TitleTable>
              <button
                className="button"
                onClick={() => {
                  setIdDivision(null);
                  setCardState({
                    ...initialCardState,
                    showCardDiv: !cardState.showCardDiv,
                  });
                }}
              >
                <MdAdd />
              </button>
              <CustomSelect2
                //  label="Nama Divisi / Bagian"
                options={[
                  <option value="" disabled selected>
                    Pilih Bagian Pt
                  </option>,
                  ...dataPt.map((data, i) => (
                    <option key={i} defaultValue={data.name_pt}>
                      {data.name_pt}
                    </option>
                  )),
                ]}
                name="name_division"
                value={dataChangePt}
                onChange={(e) => setDataChangePt(e.target.value)}
              />
            </TableHeader>
            <TableBody>
              <TableContent>
                <Thead>
                  <th>ID</th>
                  <th>Name Division</th>
                  <th>Actions</th>
                </Thead>
                {division.length === 0 || division === null ? (
                  <p>data kosong</p>
                ) : (
                  <>
                    {division.map((data, i) => {
                      return (
                        <Tbody key={i}>
                          <tr>
                            <td className="border">{`${i + 1}.`}</td>
                            {/* <td className=" border ">{data.name_pt}</td> */}
                            <td className=" border ">{data.name_division}</td>
                            <td className="border  flex gap-1 place-content-center">
                              <button
                                className=" button_edit"
                                onClick={() => {
                                  setIdDivision(data.id_division);
                                  setCardState({
                                    ...initialCardState,
                                    showCardDivEdit: !cardState.showCardDivEdit,
                                  });
                                }}
                              >
                                <MdEdit />
                              </button>
                              <button
                                className="button_delete"
                                onClick={() => {
                                  setIdDivision(data.id_division);
                                  setCardState({
                                    ...initialCardState,
                                    showCardDivDel: !cardState.showCardDel,
                                  });
                                }}
                              >
                                <MdDelete />
                              </button>
                            </td>
                          </tr>
                        </Tbody>
                      );
                    })}
                  </>
                )}
              </TableContent>
            </TableBody>
          </section>
        </section>
      </ContentLayout>
    </MainLayout>
  );
};

export default SetUp;
