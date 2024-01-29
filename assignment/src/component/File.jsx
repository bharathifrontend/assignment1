import React from "react";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
export const File = () => {
  const [data, setData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [filterdata, setFilteredData] = useState([]);

  useEffect(() => {
    // This effect will run after each render when 'data' is updated
    handleFilterConsecutiveDays();
  }, [data]);

  const handleFilterConsecutiveDays = () => {
    console.log(data);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        // Iterate through each sheet and convert date values
        const jsonData = {};
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          jsonData[sheetName] = XLSX.utils.sheet_to_json(sheet, {
            raw: false,
            defval: null,
            dateNF: "mm/dd/yyyy h:mm AM/PM", // Specify the date format
          });
          jsonData[sheetName].forEach((row) => {
            Object.keys(row).forEach((key) => {
              if (
                typeof row[key] === "number" &&
                XLSX.SSF.parse_date_code(row[key])
              ) {
                row[key] = XLSX.SSF.parse_date_code(row[key]);
              }
            });
          });
        });
        let tempEmp = [];
        let tempTimeCard = [];
        for (let i = 0; i < jsonData.Sheet1.length; i++) {
          tempTimeCard.push({
            name: jsonData.Sheet1[i]["Employee Name"],
            position: jsonData.Sheet1[i]["Position ID"],
            date: "",
            timeCardHrs: jsonData.Sheet1[i]["Timecard Hours (as Time)"],
          });
          if (!tempEmp.includes(jsonData.Sheet1[i]["Employee Name"])) {
            tempEmp.push(jsonData.Sheet1[i]["Employee Name"]);
          }
        }
        setEmployeeList(tempEmp);
        setData(tempTimeCard);
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {data.length > 0 && (
        <div>
          <h2>Data Table</h2>
          <table border="1">
            <thead>
              <tr>
                {Object.keys(data[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
