import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {MdEditNote} from 'react-icons/md'
import {IoIosAdd , IoMdArrowRoundBack} from 'react-icons/io'
import { BiCategory} from 'react-icons/bi'
import "../../CSS/form.css";
import { DashboardNew } from '../../Component/Dashboard';

const CreateCategory = () => {
  
    let [categoryPayload, setCategoryPayload] = useState({})
    let [updatePayload, setUpdatePayload] = useState({})
    let [allCategories,setAllCategories] = useState([])
    let [responseMsg,setResponseMsg] = useState({})
    let [haveResponse,setHaveResponse] = useState(false)
    let [currentMode,setCurrentMode] = useState('List')

    const getCategoryList = async () => {
        let url = "http://localhost:4001/api/getcategories";
        
        try {
          let response = await axios.get(url);
    
          if (response && response.data) {
            setAllCategories(response.data.response);
          }
        } catch (error) {
          console.log("error", error);
        }
    };


useEffect(()=>{
    getCategoryList()
},[])

const columns = [
    {
      name: "Category Name",
      selector: "categoryName",
      sortable: true,
    },
    {
      name: "Description",
      selector: "categoryDescription",
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
        'categoryName':data.categoryName,
        'categoryDescription':data.categoryDescription,
    })
    setCurrentMode('Update')
  }


  const onChangeHandler = (e) => {
    let categoryPayloadCopy = { ...categoryPayload };
    categoryPayloadCopy[e.target.id] = e.target.value;
    setCategoryPayload(categoryPayloadCopy);
  }

  const updateChangeHandler = (e) =>{
    let updatePayloadCopy = { ...updatePayload };
    updatePayloadCopy[e.target.id] = e.target.value;
    setUpdatePayload(updatePayloadCopy);
  }


  const handlesubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:4001/api/createcategory";
    try {
      let response = await axios.post(url, categoryPayload);
      if (response) {
        if(response.data.message){
            setCurrentMode('List')
            getCategoryList()
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

    let url = "http://localhost:4001/api/updatecategory";
    try {
      let response = await axios.patch(url, updatePayload);
      if (response) {
        if(response.data.message){
            setCurrentMode('List')
            getCategoryList()
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
    setCategoryPayload({})
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
                          <h4 className='fw-bold text-center mb-4'>Add Category</h4>
                       </div>
                       <div className='col-md-4'>
                          <button type='button' className='btn common-category-btn' onClick={()=>changeMode('List')}> <BiCategory className='me-2'/> All Category</button>
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
                                htmlFor="categoryName"
                                className="form-label"
                                >
                                Category Name
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="categoryName"
                                value={categoryPayload.categoryName}
                                onChange={(e) => onChangeHandler(e)}
                                />

                            </div>
                            <div className="mb-3 col-lg-6">
                                <label
                                htmlFor="categoryDescription"
                                className="form-label"
                                >
                                Description
                                </label>
                                <textarea
                                className="form-control"
                                id="categoryDescription"
                                value={categoryPayload.categoryDescription}
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
                          <h4 className='fw-bold text-center mb-4'>Update Category</h4>
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
                                htmlFor="categoryName"
                                className="form-label"
                                >
                                Category Name
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="categoryName"
                                value={updatePayload.categoryName}
                                onChange={(e) => updateChangeHandler(e)}
                                />

                            </div>
                            <div className="mb-3 col-lg-6">
                                <label
                                htmlFor="categoryDescription"
                                className="form-label"
                                >
                                Description
                                </label>
                                <textarea
                                className="form-control"
                                id="categoryDescription"
                                value={updatePayload.categoryDescription}
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
                          <h4 className='fw-bold text-center mb-4'>All Category</h4>
                       </div>
                       <div className='col-md-4'>
                          <button type='button' className='common-category-btn' onClick={()=>changeMode('Create')}> <IoIosAdd className='me-2'/> Add Category</button>
                       </div>
                    </div>
                    <div className='row'>
                    <DataTable
                        columns={columns}
                        data={allCategories}
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

export default CreateCategory