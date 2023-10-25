import { useEffect, useState } from "react";
import { CustomSelect } from "../../../atoms";
import { AxiosInstance } from "../../../../apis/api";

const FormRequest = ({ handleChangeValue, formValues }) => {
  const [approved1, setApproved1] = useState([]);
  const [approved2, setApproved2] = useState([]);
  const [dataPt, setDataPt] = useState([]);

  const fetchData = async () => {
    try {
      const [response1, response2, response3] = await Promise.all([
        AxiosInstance.get("/auth/user/role/1"),
        AxiosInstance.get("/auth/user/role/3"),
        AxiosInstance.get("/app"),
      ]);

      setApproved1(response1.data.data);
      setApproved2(response2.data.data);
      setDataPt(response3.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const optionsPt = [
    <option value="" disabled selected>
      Pilih Bagian Pt
    </option>,
    ...dataPt.map((stock, i) => (
      <option key={stock.name_pt} defaultValue={stock.name_pt}>
        {stock.name_pt}
      </option>
    )),
  ];
  const [dataDivision, setDataDivision] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (formValues.name_pt) {
        try {
          const res = await AxiosInstance.get(
            `/app/division/${formValues.name_pt}`
          );
          setDataDivision(res.data.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [formValues]);
  const optionsDiv = [
    <option value="" disabled selected>
      Pilih Divisi
    </option>,
    ...dataDivision.map((stock, i) => (
      <option key={i} defaultValue={stock.name_division}>
        {stock.name_division}
      </option>
    )),
  ];
  return (
    <div className="flex flex-wrap gap-2 bg-slate-300 px-3 py-4 rounded-xl">
      <CustomSelect
        label="Nama PT"
        options={optionsPt}
        name="name_pt"
        value={formValues.name_pt}
        onChange={handleChangeValue}
      />
      <CustomSelect
        label="Nama Divisi / Bagian"
        options={optionsDiv}
        name="name_division"
        value={formValues.name_division}
        onChange={handleChangeValue}
        disabled={formValues.name_pt === ""}
      />

      <CustomSelect
        label="Approved 1"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Approved 1
          </option>,
          ...approved1.map((approved1, index) => (
            <option key={index} value={approved1.username}>
              {approved1.username}
            </option>
          )),
        ]}
        name="approved_1"
        value={formValues.approved_1}
        onChange={handleChangeValue}
      />
      <CustomSelect
        label="Approved 2"
        options={[
          <option key="default" value="" disabled selected>
            Pilih Approved 2
          </option>,
          ...approved2.map((approved1, index) => (
            <option key={index} value={approved1.username}>
              {approved1.username}
            </option>
          )),
        ]}
        name="approved_2"
        value={formValues.approved_2}
        onChange={handleChangeValue}
      />
    </div>
  );
};

export default FormRequest;
