// import React, { useState, useEffect } from "react";
// import uuid from "uuid";

// function generateCode(type, size) {
//   const [code, setCode] = useState("");

//   useEffect(() => {
//     const generateCode = async () => {
//       const uuid = await crypto.randomUUID();
//       setCode("IT-" + uuid.substring(0, 3) + "-" + size);
//     };

//     generateCode();
//   }, [type, size]);

//   return code;
// }

// export default generateCode;

import React, { useState, useEffect } from "react";

function GenerateID() {
  const [deviceType, setDeviceType] = useState("HDD");
  const [storageCapacity, setStorageCapacity] = useState("1000GB");
  const [sequenceNumber, setSequenceNumber] = useState(1);
  const [generatedID, setGeneratedID] = useState("");

  useEffect(() => {
    const formattedSequenceNumber = String(sequenceNumber).padStart(4, "0");
    const newGeneratedID = `IT-${deviceType}-${storageCapacity}-${formattedSequenceNumber}`;
    setGeneratedID(newGeneratedID);
  }, [deviceType, storageCapacity, sequenceNumber]);

  const incrementSequenceNumber = () => {
    setSequenceNumber(sequenceNumber + 1);
  };

  return (
    <div>
      <p>Generated ID: {generatedID}</p>
      <div>
        <label>Device Type:</label>
        <select
          onChange={(e) => setDeviceType(e.target.value)}
          value={deviceType}
        >
          <option value="HDD">HDD</option>
          <option value="MRAM3">MRAM3</option>
        </select>
      </div>
      <div>
        <label>Storage Capacity:</label>
        <select
          onChange={(e) => setStorageCapacity(e.target.value)}
          value={storageCapacity}
        >
          <option value="1000GB">1000GB</option>
          <option value="500GB">500GB</option>
          <option value="256GB">256GB</option>
        </select>
      </div>
      <button onClick={incrementSequenceNumber}>
        Increment Sequence Number
      </button>
    </div>
  );
}

export default GenerateID;
