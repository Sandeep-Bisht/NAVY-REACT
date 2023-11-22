import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";
import { DashboardNew } from "../../Component/Dashboard";
import "../../CSS/dashboard.css";
import { apiBaseUrl } from "../../util.js";
am4core.useTheme(am4themes_animated);

const Dashboard = () => {
  let [cartCounts, setCartCounts] = useState({});
  let [categoryWiseUser, setCategoryWiseUser] = useState([]);

  const getCartCounts = async () => {
    let chartCounterUrl = `${apiBaseUrl}getCartsCounts`;

    try {
      let response = await axios.get(chartCounterUrl);

      if (response && response.data) {
        setCartCounts(response.data.responseObj);
      }
    } catch (error) {
      console.log("error", error);
    }

    let pieChartDataUrl = `${apiBaseUrl}getConfirmationCount`;

    try {
      let response = await axios.get(pieChartDataUrl);

      if (response && response.data) {
        createPieChart(response.data.response);
      }
    } catch (error) {
      console.log("error", error);
    }

    let categoryWiseUserCount = `${apiBaseUrl}getCategoryUserCount`;

    try {
      let response = await axios.get(categoryWiseUserCount);

      if (response && response.data) {
        setCategoryWiseUser(response.data.categoryData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCartCounts();
  }, []);

  let createPieChart = (data) => {
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.data = data;
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "counter";
    pieSeries.dataFields.category = "type";
  };

  let categoryCarts = (data, time) => {
    let renderCarts = [];
    let i = 0;
    for (i; i < time; i++) {
      renderCarts.push(data[i]);
    }

    return renderCarts;
  };

  return (
    <>
      <DashboardNew>
        <section className=" default-dashboard-view">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="conter-card one d-flex ">
                <div className="left">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="right">
                  <p className="counter-card-number ms-0">{cartCounts.usersCount}</p>
                  <p className="counter-card-title">Users</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="conter-card two d-flex ">
                <div className="left">
                  <i className="fa-solid fa-user-check"></i>
                </div>
                <div className="right">
                  <p className="counter-card-number ms-0">
                    {cartCounts.sentSmsCount}
                  </p>
                  <p className="counter-card-title">Sent</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="conter-card three d-flex">
                <div className="left">
                  <i className="fa-solid fa-file-export"></i>
                </div>
                <div className="right">
                  <p className="counter-card-number ms-0">
                    {cartCounts.pendingSmsCount}
                  </p>
                  <p className="counter-card-title">Pending</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="conter-card four d-flex">
                <div className="left">
                  <i class="fa-solid fa-file-excel"></i>
                </div>
                <div className="right">
                  <p className="counter-card-number ms-0">
                    {cartCounts.failedSmsCount}
                  </p>
                  <p className="counter-card-title">Failed</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container p-0 category-store">
            <div className="row ">
              {categoryWiseUser.length > 0 &&
                categoryWiseUser.map((item, index) => {
                  return (
                    <>
                      <div className="col-md-2 col-6">
                        <div className="conter-card one">
                          <div className="left category-icon">
                            <i class="fa-solid fa-user-shield"></i>
                            <p className="counter-card-number">
                              {item.userCount}
                            </p>
                          </div>
                          <div className="right">
                            {/* <p className="counter-card-number">
                              {item.userCount}
                            </p> */}
                            <p className="counter-card-title">
                              {item.categoryName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-md-8">
                <div
                  id="chartdiv"
                  style={{ width: "100%", height: "500px" }}
                ></div>
              </div>
              <div className="col-md-4 ">
                <div className="conter-card catagory">
                  <div className="left category-icon">
                    <i class="fa-solid fa-user-shield"></i>
                  </div>
                  <div className="right">
                    <p className="counter-card-number">
                      {categoryWiseUser.length}
                    </p>
                    <p className="counter-card-title">Categories</p>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardNew>
      
      
    </>
  );
};


export default Dashboard;
