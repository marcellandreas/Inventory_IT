export function renderEmptyRows(submissionData) {
  const emptyRows = [];

  if (submissionData && submissionData.length < 5) {
    for (let i = 0; i < 5 - submissionData.length; i++) {
      emptyRows.push(
        <tr key={i + submissionData.length} className="border">
          <td className="border py-0 m-0 border-black">
            <p className="text-white">a</p>
          </td>
          <td className="border py-0 m-0 border-black"></td>
          <td className="border py-0 m-0 border-black"></td>
          <td className="border py-0 m-0 border-black"></td>
        </tr>
      );
    }
  }

  return emptyRows;
}