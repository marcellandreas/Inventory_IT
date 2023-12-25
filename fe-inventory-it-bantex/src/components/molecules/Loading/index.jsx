import { LazyLoadImage } from "react-lazy-load-image-component";
import loading from "../../../assets/images/loading.svg";
const Loading = () => {
  return (
    <section className="h-[70vh] col-span-6 w-full flex justify-center items-center">
      <LazyLoadImage src={loading} alt="loading" height={120} width={120} />
    </section>
  );
};

export default Loading;
