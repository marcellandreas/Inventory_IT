import loading from "../../../assets/images/loading.svg";
const Loading = () => {
  return (
    <section className="h-[80vh] w-full flex justify-center items-center">
      <img src={loading} alt="loading.svg" />
    </section>
  );
};

export default Loading;
