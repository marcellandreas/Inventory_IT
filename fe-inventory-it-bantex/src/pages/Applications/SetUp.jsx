import { useEffect, useState } from "react";
import { TableBody, TableHeader } from "../../components/organisms";
import { TableContent, Tbody, Thead } from "../../components/atoms";
import { MainLayout, ContentLayout } from "../../components/templates";

const SetUp = () => {
  const [dataPt, setDataPt] = useState([]);
  useEffect(() => {
    GetDataPT()
      .then((res) => {
        setDataPt(res);
      })
      .catch((err) => console.log(err));
  });
  return (
    <MainLayout>
      <ContentLayout>
        <section className=" col-span-6 grid grid-cols-3 gap-4 grid-flow-dense ">
          {/* contet name pt */}
          <div className=" bg-slate-200 py-2 rounded-xl min-h-[50px] row-span-4 col-span-1">
            {/* <TableHeader> */}
            <h1 className="text-center font-semibold">Nama PT.</h1>
            <div className="p-2">
              <button className="button">Add</button>
            </div>
            {/* </TableHeader> */}
            <TableBody>
              <TableContent>
                <Thead>
                  <tr>
                    <th>NO.</th>
                    <th>PT.</th>
                  </tr>
                </Thead>
                <Tbody>
                  {dataPt.map((data, i) => (
                    <tr key={i}>
                      <td className="border px-4 py-2">{i + 1}</td>
                      <td className="border px-4 py-2">{data.name_pt}</td>
                    </tr>
                  ))}
                </Tbody>
              </TableContent>
            </TableBody>
          </div>
          <div className=" bg-slate-200 rounded-xl min-h-[50px] ">asdh</div>
          <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-3 ">
            <div className="text-center">Category</div>
          </div>
          <div className=" bg-slate-200 rounded-xl min-h-[50px]">asdh</div>
          <div className=" bg-slate-200 rounded-xl min-h-[50px]">asdh</div>
          <div className=" bg-slate-200 rounded-xl min-h-[50px] col-span-2">
            asdh
          </div>
          <div className=" bg-slate-200 rounded-xl min-h-[50px]">asdh</div>
          <div className=" bg-slate-200 rounded-xl min-h-[50px]">asdh</div>
          <div className=" bg-slate-200 rounded-xl min-h-[50px]">asdh</div>
        </section>
      </ContentLayout>
    </MainLayout>
  );
};

export default SetUp;
