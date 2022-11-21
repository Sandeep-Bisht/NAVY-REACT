import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
import "../../CSS/form.css";

const AddInvites = () => {
  let [guestInfo, setGuestInfo] = useState({})

  const onChangeHandler = (e) => {
    let guestInfoCopy = { ...guestInfo };
    guestInfoCopy[e.target.id] = e.target.value;
    setGuestInfo(guestInfo);
  }
  const loginFormSubmit = (e) => {
    e.preventDefault();
    console.log(guestInfo, "aa gaya jjj");
  }

return (
    <>
      <section className='guest-form p-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 mx-auto'>
              <form
                className='common-form row'
                onSubmit={(e) => loginFormSubmit(e)}
              >
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="guestName"
                    className="form-label"
                  >
                    Guest Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="guestName"
                    aria-describedby="emailHelp"
                    onChange={(e) => onChangeHandler(e)}
                  />

                </div>
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="guestDesignation"
                    className="form-label"
                  >
                    Guest Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="guestDesignation"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="guestPhoneNumber"
                    className="form-label"
                  >
                    Guest PhoneNumber
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="guestPhoneNumber"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="officialPhoneNumber"
                    className="form-label"
                  >
                    Official Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="officialPhoneNumber"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>


                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="guestEmail"
                    className="form-label"
                  >
                    Guest Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="guestEmail"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="department"
                    className="form-label"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label for="address" class="form-label">Address</label>
                  <textarea class="form-control"
                    id="address"
                    rows="3"
                    onChange={(e) => onChangeHandler(e)}

                  >

                  </textarea>
                </div>
                <div className='mt-4 col-lg-12'>
                  <button type="submit" className="btn common-form-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>


  )
}

export default AddInvites