import { useState, useEffect } from "react";
import { view_a_shelf, view_all_shelves } from "../utilities";
import {useOutletContext} from  "react-router-dom";
import ShelfLinksCard from "../components/ShelfLinksCard";
//bootstrap stuff



function UserHomePage() {
  // const [myshelves, setMyShelves] =  useState([])
  let { user, myshelves, setMyShelves } = useOutletContext();

  
  useEffect(() =>{
 async function view_shelves() {
   let shelves = await view_all_shelves();
   console.log("home page shelves",shelves)
   setMyShelves(shelves)
 };
view_shelves()
}, [])


  return (<>
  <h1> HOME PAGE</h1><button>BUTTON</button>
<ShelfLinksCard shelfInfo={myshelves} />
   </>)
}

export default UserHomePage;
