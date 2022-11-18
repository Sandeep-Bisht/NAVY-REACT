import React, { useEffect, useState } from "react";
import axios from "axios";

const GuestList = () => {
  const [guestList, setGuestList] = useState();

  useEffect(() => {
    getGuestList();
  }, []);

  let getGuestList = async () => {
    let url = "http://localhost:4001/api/getGuestList";
    try {
      let response = await axios.get(url);
      if (response && response.data) {
        console.log("response guestlist", response.data);
        setGuestList(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return <div>GuestList</div>;
};

export default GuestList;
