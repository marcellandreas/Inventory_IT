const FormDeleteModalItem = ({ onClose }) => {
  return (
    <form className="w-[450px] bg-amber-300 p-4 rounded-xl flex flex-col gap-3">
      <h1 className="text-2xl text-center">Menghapus Stock Inventory IT</h1>
      <hr className="border border-slate-800 w-2/5 m-auto" />

      <div className="flex flex-wrap gap-2">
        <button className="flex-1 rounded-md bg-slate-800 text-white p-2">
          Delete Stock
        </button>
        <button
          onClick={() => {
            onClose();
          }}
          className="flex-1 border-2 border-slate-800 bg-white rounded-md p-2 hover:bg-slate-800 hover:text-white"
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default FormDeleteModalItem;
