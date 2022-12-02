import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { apiBaseUrl } from "../../util.js";
import { useParams } from "react-router-dom";
import { DashboardNew } from "../../Component/Dashboard";

const Reports = () => {
  const param = useParams();
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState()
  const [columns,setColumns] = useState([]);


  useEffect(() => {
    getConfirmedGuestList(param.date);

    let staticColumns = [
      {
        name: "Invitee No",
        selector: "inviteNo",
        sortable: true,
      },
      {
        name: "Name",
        selector: "guestName",
        sortable: true,
      },
      {
        name: "Invitation",
        selector: "invitationStatus",
        sortable: true,
      },
      {
        name: "Availablity",
        selector: "availability",
        sortable: true,
      },
      {
        name: "Mobile No",
        selector: "guestNumber",
        sortable: true,
      },
    ];
    
    setColumns(staticColumns)

  }, [param]);

  

  const getConfirmedGuestList = async (date) => {
    let url = `${apiBaseUrl}getConfirmationGuest/${date}`;
    try {
      let response = await axios.get(url);
      if (response && response.data.guestList) {
        setTableData(response.data.guestList);
        setTotalCount(response.data.guestList.length)
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const extentionData = {
    columns,
    data: tableData,
  };


  return (
    <>
    <DashboardNew>
    <div className="row">
          <div className="col-md-12">
            <h4 className="fw-bold text-center mb-4">Confirmed Guest List - {totalCount && totalCount}</h4>
          </div>
        </div>
      <div className="main-table">
        {tableData.length > 0 ? (
          <DataTableExtensions {...extentionData}>
            <DataTable
              columns={columns}
              data={tableData}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
          </DataTableExtensions>
        ) : (
          <p>No Data Found</p>
        )}
      </div>
      </DashboardNew>
    </>
  );
};

export default Reports;
