import React from "react";

const ExcelReader = ({ excelData }) => {
  return (
    <div>
      <h2>Excel Data</h2>
      <pre>{JSON.stringify(excelData, null, 2)}</pre>
    </div>
  );
};

export default ExcelReader;
