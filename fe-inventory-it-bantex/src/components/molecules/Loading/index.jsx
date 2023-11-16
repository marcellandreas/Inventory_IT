import loading from "../../../assets/images/loading.svg";
const Loading = () => {
  return (
    <section className="h-[70vh] col-span-6 w-full flex justify-center items-center">
      <img src={loading} alt="loading.svg" />
    </section>
  );
};

export default Loading;
