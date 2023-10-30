import SearchNotFound from "../../../assets/images/search-not-found.jpg";
import DataNotFound from "../../../assets/images/data-not-found.jpg";
import { DynamicComponent } from "./DynamicComponent";

export function generateDynamicContent(dataCount, filteredData, component) {
  if (dataCount.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <img src={DataNotFound} alt="data no found" className="w-52 h-52" />
        <div> Maaf, tidak ada data yang tersedia saat ini</div>
      </div>
    );
  } else if (filteredData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <img
          src={SearchNotFound}
          alt="search not found"
          className=" w-52 h-52"
        />
        <div>Maaf, data yang Anda cari tidak ditemukan</div>
      </div>
    );
  } else {
    return <DynamicComponent component={component} />;
  }
}

// Di halaman Anda, Anda dapat menggunakannya seperti ini:
//  {generateDynamicContent(dataPcMaster, filteredData, <TablePcMasters data={filteredData} />)}
