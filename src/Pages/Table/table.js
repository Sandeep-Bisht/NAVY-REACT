import React, { useEffect, useState } from "react";
import axios from "axios";

export const dataTable = () => {
    const [ guestList, setGuestList] = useState()
  
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
    console.log(guestList,"hekkkkko")


}       

  
   export  const columns = [
        {
          name: "Guest Name",
          selector: "guestName",
          sortable: true
        },
        {
          name: "Designation",
          selector: "guestDesignation",
          sortable: true
        },
        {
          name: "Department",
          selector: "guestDepartment",
          sortable: true,
          cell: d => <span>{d.genres.join(", ")}</span>
        },
        {
          name: "Personal No",
          selector: "guestNumber",
          sortable: true
        },
        {
            name: "Office No",
            selector: "guestOfficeNumber",
            sortable: true
          },
          {
            name: "guestEmail",
            selector: "year",
            sortable: true
          },
          {
            name: "Address",
            selector: "guestAddress",
            sortable: true
          }
      ];
    
    
    export const data = [
        {
          id: 137,
          title: "Spotlight",
          year: "2015",
          runtime: "128",
          genres: ["Biography", "Crime", "Drama"],
          director: "Tom McCarthy",
          actors: "Mark Ruffalo, Michael Keaton, Rachel McAdams, Liev Schreiber",
          plot:
            "The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.",
          posterUrl:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg"
        },
        
      ];