// ExcelToJsonConverter.js
import React from "react";
import * as XLSX from "xlsx";
import { useState } from "react";

class ExcelToJsonConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: null,
    };
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: "binary",
          dateNF: "mm/dd/yyyy h:mm AM/PM",
        });
        const jsonData = this.extractDataFromWorkbook(workbook);
        setData(jsonData.Sheet1);
        console.log(jsonData.Sheet1);
        this.setState({ jsonData });

        // Pass the JSON data to the parent component
        if (this.props.onJsonDataChange) {
          this.props.onJsonDataChange(jsonData);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  extractDataFromWorkbook = (workbook) => {
    const result = {};

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      result[sheetName] = XLSX.utils.sheet_to_json(sheet);
    });

    return result;
  };
  analyzeAndPrint = () => {
    const { jsonData } = this.state;
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.analyzeAndPrint}>
          Print Employee Information
        </button>
        {this.state.jsonData && (
          <pre>{JSON.stringify(this.state.jsonData, null, 2)}</pre>
        )}
      </div>
    );
  }
}

export default ExcelToJsonConverter;
