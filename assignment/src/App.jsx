// import React, { useState } from "react";
// import { OutTable, ExcelRenderer } from "react-excel-renderer";

// function App() {
//   const [header, setHeader] = useState([]);
//   const [cols, setCols] = useState([]);

//   const handleFile = (event) => {
//     const file = event.target.files[0];
//     ExcelRenderer(file, (err, response) => {
//       if (err) {
//         console.log(err);
//       } else {
//         setHeader(response.rows[0]);
//         setCols(response.rows);
//       }
//     });
//   };

//   return (
//     <div>
//       <input
//         style={{ margin: "10px auto" }}
//         type="file"
//         onChange={handleFile}
//       ></input>
//       <br />
//       <table
//         style={{
//           borderCollapse: "collapse",
//           margin: "10px auto",
//           border: "1px solid black",
//         }}
//       >
//         <thead>
//           <tr>
//             {header.map((h, i) => (
//               <th style={{ border: "1px solid black" }} key={i}>
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {cols.slice(1).map((col, i) => (
//             <tr key={i}>
//               {col.map((c, i) => (
//                 <td style={{ border: "1px solid black" }} key={i}>
//                   {c}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;
// App.js
import React, { useState } from "react";
import ExcelToJsonConverter from "C:/Users/SANTHOSH/React/assignment/src/component/ExcelToJsonConverter.jsx";
import { File } from "./component/file";
function App() {
  const [jsonData, setJsonData] = useState(null);

  const handleJsonDataChange = (data) => {
    setJsonData(data);
  };

  return (
    <div>
      <h1>Excel to JSON Converter</h1>
      <File></File>
    </div>
  );
}

export default App;
