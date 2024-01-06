const generateTableRows = (submissionData) => {
  return (submissionData || Array(10).fill(null)).map((sub, index) => (
    <tr key={index} className="border">
      <td className="border py-0 m-0 border-black">
        {sub ? index + 1 : <p className="text-white">null</p>}
      </td>
      <td className="border py-0 m-0 border-black">
        {sub ? sub.stock_description : ""}
      </td>
      <td className="border py-0 m-0 border-black">{sub ? sub.qty : ""}</td>
      <td className="border py-0 m-0 border-black">{sub ? sub.note : ""}</td>
    </tr>
  ));
};

export { generateTableRows };
