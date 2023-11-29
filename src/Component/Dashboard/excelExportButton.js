import React from 'react';
import { utils, writeFile } from 'xlsx';

const ExcelExportButton = (props) => {

    const exportToExcel = () => {
        const worksheet = utils.json_to_sheet(props.data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        writeFile(workbook, 'my_data.xlsx');
      };

  return (
    <button onClick={exportToExcel} className="common-category-btn">
    Export to Excel
  </button>
  )
}

export default ExcelExportButton