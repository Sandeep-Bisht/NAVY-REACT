import React, { useEffect, useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';
import { DashboardNew } from '../../Component/Dashboard';
import '../../CSS/dashboard.css'
am4core.useTheme(am4themes_animated);

const Dashboard = () => {

  let [cartCounts, setCartCounts] = useState({})
  let [categoryWiseUser, setCategoryWiseUser] = useState([])

  const getCartCounts = async () => {
    let chartCounterUrl = "http://localhost:4001/api/getCartsCounts";
    
    try {
      let response = await axios.get(chartCounterUrl);

      if (response && response.data) {
        setCartCounts(response.data.responseObj);
      }
      } catch (error) {
        console.log("error", error);
      }

      let pieChartDataUrl = "http://localhost:4001/api/getConfirmationCount";

      try {
        let response = await axios.get(pieChartDataUrl);
  
        if (response && response.data) {
          createPieChart(response.data.response)
        }
        } catch (error) {
          console.log("error", error);
        }

        let categoryWiseUserCount = "http://localhost:4001/api/getCategoryUserCount";
        
        try {
          let response = await axios.get(categoryWiseUserCount);
    
          if (response && response.data) {
            setCategoryWiseUser(response.data.categoryData)
          }
          } catch (error) {
            console.log("error", error);
          }
    
    };

  useEffect(()=>{
    getCartCounts()
  },[])

  let createPieChart = (data) => {

    let chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.data = data
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "counter";
    pieSeries.dataFields.category = "type";
}


  return (
    <>
    <DashboardNew> 
      <section className=' default-dashboard-view'>
      <div className='row'>
      <div className="col-md-3">
                                        <div className="conter-card one">
                                            <div className="left"><i className="fa-solid fa-users"></i></div>
                                            <div className="right">
                                                <p className="counter-card-number">{cartCounts.usersCount}</p>
                                                <p className="counter-card-title">Users</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="conter-card two">
                                            <div className="left"><i className="fa-solid fa-user-check"></i></div>
                                            <div className="right">
                                                <p className="counter-card-number">{cartCounts.sentSmsCount}</p>
                                                <p className="counter-card-title">Sent</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="conter-card three">
                                            <div className="left"><i className="fa-solid fa-file-export"></i></div>
                                            <div className="right">
                                                <p className="counter-card-number">{cartCounts.pendingSmsCount}</p>
                                                <p className="counter-card-title">Pending</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="conter-card four">
                                            <div className="left"><i className="fa-brands fa-elementor"></i></div>
                                            <div className="right">
                                                <p className="counter-card-number">{cartCounts.failedSmsCount}</p>
                                                <p className="counter-card-title">Failed</p>
                                            </div>
                                        </div>
                                    </div>
      </div>
      <div className='row'>
               <div className='col-md-8'>
                <div id="chartdiv" className='p-4' style={{ width: "100%", height: "500px" }}>
                  </div>
                  </div>
                  <div className='col-md-4'>
                  {categoryWiseUser.length > 0 && categoryWiseUser.map((item,index)=>{
                    return(<>
                      <div className="default-dashboard-view">
                <div className="container">
                    <div className="row">
                                    <div className="col-md-12 ">
                                        <div className="conter-card one">
                                            <div className="left"><i className="fa-solid fa-user-plus"></i></div>
                                            <div className="right">
                                                <p className="counter-card-number">{item.userCount}</p>
                                                <p className="counter-card-title">{item.categoryName}</p>
                                            </div>
                                        </div>
                                    </div>
                    </div>
                </div>
            </div>
                    </>)
                  })}
                  </div>
        </div>
        </section>
    </DashboardNew>
    </>
  )
}

export default Dashboard