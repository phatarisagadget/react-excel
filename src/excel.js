import axios from "axios";
import React, { useState, useEffect } from "react";
var XLSX = require("xlsx");

// const baseURL = 'https://repair-backend-dev.gadgetstory.co.th'
const baseURL = 'http://192.168.1.131:8080'
const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0LmRldmVsb3BlckBnYWRnZXRzdG9yeS5jby50aCIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsInVzZXJfaWQiOjEyLCJpYXQiOjE2NjI5NTg2OTQsImV4cCI6MTY2MzA0NTA5NH0.r7fmmXvARBmNhDWgq5_Tk-ol8kZDwoYst-8IPjp0dqw'

function Excel() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL+'/repair-request?status_no=0&customer_name', {
          headers: {
            'Authorization': `Bearer ${Token}`
          }
        }
        ).then((response) => {
            console.log(response)
          setData(response.data);
        });
      }, []); 
    return (<button onClick={async () => {

        /* generate worksheet and workbook */
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

        /* fix headers */
        XLSX.utils.sheet_add_aoa(worksheet, [["repair_id", "repair_no","customer_firstname"]], { origin: "A1" });

        /* calculate column width */
        const max_width = data.reduce((w, r) => Math.max(w, r.repair_no.length), 20);
        worksheet["!cols"] = [{ wch: max_width }];

        /* create an XLSX file and try to save to Presidents.xlsx */
        XLSX.writeFile(workbook, "Presidents.xlsx");
    }}><b>Click to Generate file!</b></button>);
}

export default Excel;
