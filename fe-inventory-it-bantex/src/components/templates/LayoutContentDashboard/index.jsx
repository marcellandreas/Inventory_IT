const LayoutContentDashboard = ({ children }) => {
  return (
    <section className="h-[80vh] overflow-hidden p-5 overflow-y-auto ">
      {children}
    </section>
  );
};

export default LayoutContentDashboard;

{
  /* <section className="gap-2 max-h-[256px] p-4 w-full justify-between items-center  flex flex-col flex-wrap  overflow-hidden  overflow-y-auto">
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">Pc Number</label>
  <select
    className="w-full border-gray-300 rounded-md shadow-sm"
    onChange={handleChange}
    name="id_pc_master"
  >
    {options}
  </select>
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">Pc Description</label>
  <input
    type="text"
    name="pc_description"
    readOnly
    value={formValues.pc_description}
  />
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">Unit</label>
  <input type="text" name="unit" readOnly value={formValues.unit} />
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">Category</label>
  <input
    type="text"
    name="category"
    readOnly
    value={formValues.category}
  />
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">Note</label>
  <textarea value={formValues.note} readOnly className="w-full" />
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">pc spectification</label>
  <input
    type="text"
    name="pc_spectification"
    readOnly
    value={formValues.pc_spectification}
  />
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">Status Barang</label>
  <div className="flex flex-wrap gap-1" readOnly>
    <input
      type="radio"
      name="status"
      value="used"
      checked={formValues.status === "used"}
      className="border-2 border-slate-800 rounded-md p-2"
    />
    <label className="ml-2">used</label>
    <input
      type="radio"
      name="status"
      value="new"
      checked={formValues.status === "new"}
      className="border-2 border-slate-800 rounded-md p-2"
    />
    <label className="ml-2">Baru</label>
    <input
      type="radio"
      name="status"
      value="reused"
      checked={formValues.status === "reused"}
      className="border-2 border-slate-800 rounded-md p-2"
    />
    <label className="ml-2">Reused</label>
  </div>
</div>

<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">date_registation</label>
  <input
    type="date"
    name="date_registation"
    readOnly
    className="w-full"
    defaultValue={formValues.date_registration}
  />
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">date_expired</label>
  <input
    type="date"
    name="date_expired"
    readOnly
    value={formValues.date_expired}
  />
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">Username</label>
  <input
    type="text"
    name="pc_spectification"
    readOnly
    value={formValues.post_username}
  />
</div>
<div className="flex gap-3 flex-1">
  <label className="min-w-[140px]">Created at:</label>
  <input
    type="text"
    name="pc_spectification"
    readOnly
    value={formValues.post_date.slice(0, 10)}
  />
</div>
</section> */
}
