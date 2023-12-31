import SearchNotFound from "../../../assets/images/search-not-found.jpg";
import DataNotFound from "../../../assets/images/data-not-found.png";
import { DynamicComponent } from "./DynamicComponent";

function generateDynamicContent(dataCount, filteredData, component) {
  const content = "min-h-[60vh] flex flex-col justify-center items-center";
  if (dataCount.length === 0) {
    return (
      <div className={content}>
        <img src={DataNotFound} alt="data no found" className="w-52 h-52" />
        <div> Maaf, tidak ada data yang tersedia saat ini</div>
      </div>
    );
  } else if (filteredData.length === 0) {
    return (
      <div className={content}>
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

export default generateDynamicContent;

// Di halaman Anda, Anda dapat menggunakannya seperti ini:
//  {generateDynamicContent(dataPcMaster, filteredData, <TablePcMasters data={filteredData} />)}
