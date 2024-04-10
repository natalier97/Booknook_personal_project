import { useState, useEffect } from "react";
import { view_a_shelf, view_all_shelves } from "../utilities";
import {useOutletContext} from  "react-router-dom";
import ShelfLinksCard from "../components/ShelfLinksCard";
import ButtonAddRemove from "../components/ButtonAddRemove";
//bootstrap stuff



function UserHomePage() {
  // const [myshelves, setMyShelves] =  useState([])
  // let { user, myshelves, setMyShelves } = useOutletContext();


  return (<>
  <h1> HOME PAGE</h1><button>BUTTON</button>
<ShelfLinksCard />
<ButtonAddRemove />
   </>)
}

export default UserHomePage;
