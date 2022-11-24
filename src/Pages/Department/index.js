import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {MdEditNote} from 'react-icons/md'
import {IoIosAdd , IoMdArrowRoundBack} from 'react-icons/io'
import { BiCategory} from 'react-icons/bi'
import "../../CSS/form.css";
import { DashboardNew } from '../../Component/Dashboard';
import {apiBaseUrl} from "../../util.js"

const Departmenmt = () => {
  
    let [departmentPayload, setDepartmentPayload] = useState({})
    let [updatePayload, setUpdatePayload] = useState({})
    let [allDepartments,setAllDepartments] = useState([])
    let [responseMsg,setResponseMsg] = useState({})
    let [haveResponse,setHaveResponse] = useState(false)
    let [currentMode,setCurrentMode] = useState('List')

    const getDepartmentList = async () => {
        let url = `${apiBaseUrl}getDepartments`;
        
        try {
          let response = await axios.get(url);
    
          if (response && response.data) {
            setAllDepartments(response.data.response);
          }
        } catch (error) {
          console.log("error", error);
        }
    };


useEffect(()=>{
    getDepartmentList()
},[])

const columns = [
    {
      name: "Department Name",
      selector: "departmentName",
      sortable: true,
    },
    {
      name: "Description",
      selector: "departmentDescription",
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) =>
        (row.data = (<>
          <button
            type="button"
            className="btn invite-btn"
            onClick={()=>editUser(row)}
          >
            <MdEditNote className='text-black'/>
          </button>
          </>
        )),
        sortable: false,
    },
  ];

  const editUser = (data) =>{
    setUpdatePayload({
        '_id':data._id,
        'departmentName':data.departmentName,
        'departmentDescription':data.departmentDescription,
    })
    setCurrentMode('Update')
  }


  const onChangeHandler = (e) => {
    let departmentPayloadCopy = { ...departmentPayload };
    departmentPayloadCopy[e.target.id] = e.target.value;
    setDepartmentPayload(departmentPayloadCopy);
  }

  const updateChangeHandler = (e) =>{
    let updatePayloadCopy = { ...updatePayload };
    updatePayloadCopy[e.target.id] = e.target.value;
    setUpdatePayload(updatePayloadCopy);
  }


  const handlesubmit = async (e) => {
    e.preventDefault();

    let url = `${apiBaseUrl}createDepartment`;
    try {
      let response = await axios.post(url, departmentPayload);
      if (response) {
        if(response.data.message){
            setCurrentMode('List')
            getDepartmentList()
        }
            setHaveResponse(true)
            setResponseMsg(response.data)
            setTimeout(() => { setHaveResponse(false);setResponseMsg({}); }, 6000);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const updateUser =  async (e) => {
    e.preventDefault();

    let url = `${apiBaseUrl}updateDepartment`;
    try {
      let response = await axios.patch(url, updatePayload);
      if (response) {
        if(response.data.message){
            setCurrentMode('List')
            getDepartmentList()
        }
            setHaveResponse(true)
            setResponseMsg(response.data)
            setTimeout(() => { setHaveResponse(false);setResponseMsg({}); }, 6000);
      }
    } catch (error) {
      console.log("error", error);
    }
  }


  const changeMode = (mode) =>{
    setDepartmentPayload({})
    setUpdatePayload({})
    setResponseMsg({})
    setHaveResponse(false)
    setCurrentMode(mode)
  }
  

  return (
    <>
      <DashboardNew>
                <section className='guest-form'>
                  <div className='container-fluid'>
                        {haveResponse && <>
                            {responseMsg.errorMessage ? <p className='text-danger p-2 alert-danger'>{responseMsg.errorMessage}</p> : <p className='text-success  p-2 alert-success'>{responseMsg.message}</p>}
                        </>}

                    {currentMode == 'Create' && 
                    <>
                    <div className='row'>
                       <div className='col-md-8'>
                          <h4 className='fw-bold text-center mb-4'>Add Department</h4>
                       </div>
                       <div className='col-md-4'>
                          <button type='button' className='btn common-category-btn' onClick={()=>changeMode('List')}> <BiCategory className='me-2'/> All Departments</button>
                       </div>
                    </div>
                        <div className='row mt-2'>
                        <div className='col-md-12'>
                            <form
                            className='row common-form'
                            onSubmit={(e) => handlesubmit(e)}
                            >
                            <div className="mb-3 col-lg-6">
                                <label
                                htmlFor="departmentName"
                                className="form-label"
                                >
                                Department Name
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="departmentName"
                                value={departmentPayload.departmentName}
                                onChange={(e) => onChangeHandler(e)}
                                />

                            </div>
                            <div className="mb-3 col-lg-6">
                                <label
                                htmlFor="departmentDescription"
                                className="form-label"
                                >
                                Description
                                </label>
                                <textarea
                                className="form-control"
                                id="departmentDescription"
                                value={departmentPayload.departmentDescription}
                                onChange={(e) => onChangeHandler(e)}
                                />

                            </div>
                            
                            <div className='mt-4 col-lg-12'>
                                <button type="submit" className="common-form-btn">
                                Submit
                                </button>
                            </div>
                            </form>
                        </div>
                        </div>
                    </>
                    }

                    {currentMode == 'Update' && 
                    <>
                    <div className='row'>
                       <div className='col-md-8'>
                          <h4 className='fw-bold text-center mb-4'>Update Department</h4>
                       </div>
                       <div className='col-md-4'>
                          <button type='button' className='common-category-btn' onClick={()=>changeMode('List')}> <IoMdArrowRoundBack className='me-2'/> Back</button>
                       </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-md-12'>
                            <form
                            className='row common-form'
                            onSubmit={(e) => updateUser(e)}
                            >
                            <div className="mb-3 col-lg-6">
                                <label
                                htmlFor="departmentName"
                                className="form-label"
                                >
                                Department Name
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="departmentName"
                                value={updatePayload.departmentName}
                                onChange={(e) => updateChangeHandler(e)}
                                />

                            </div>
                            <div className="mb-3 col-lg-6">
                                <label
                                htmlFor="departmentDescription"
                                className="form-label"
                                >
                                Description
                                </label>
                                <textarea
                                className="form-control"
                                id="departmentDescription"
                                value={updatePayload.departmentDescription}
                                onChange={(e) => updateChangeHandler(e)}
                                />

                            </div>
                            
                            <div className='mt-4 col-lg-12'>
                                <button type="submit" className="common-form-btn">
                                Update
                                </button>
                            </div>
                            </form>
                        </div>
                        </div>
                        </>
                    }

                    {currentMode == 'List' && <>
                    <div className='row'>
                       <div className='col-md-8'>
                          <h4 className='fw-bold text-center mb-4'>All Department</h4>
                       </div>
                       <div className='col-md-4'>
                          <button type='button' className='common-category-btn' onClick={()=>changeMode('Create')}> <IoIosAdd className='me-2'/> Add Department</button>
                       </div>
                    </div>
                    <div className='row'>
                    <DataTable
                        columns={columns}
                        data={allDepartments}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                        />
                    </div>
                    </>
                    }
                  </div>
                </section>
      </DashboardNew>
    </>


  )
}

export default Departmenmt