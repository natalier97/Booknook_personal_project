import { useEffect, useState } from "react";
import "./App.css";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { api } from "./utilities";
import axios from "axios";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import { view_all_shelves } from "./utilities";

function App() {
  const [user, setUser] = useState(useLoaderData());
  const [searchValue, setSearchValue] = useState('');
//  #[{"id", "shelf_name", "book"}. {shelf_obj}];
  const [myshelves, setMyShelves] = useState([]); 
  const [bookInfo, setBookInfo] = useState({});

  
 async function view_shelves() {
   let shelves = await view_all_shelves();
   console.log("app.jsx shelves", shelves);
   setMyShelves(shelves);
 }
   useEffect(() => {

     view_shelves();
   }, []);


  // let outletObj = {
  //   user,
  //    setUser,
  // }

  return (
    <>
      <NavBar user={user} setUser={setUser} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Outlet context={{ user, setUser, myshelves, setMyShelves, view_shelves, bookInfo, setBookInfo }} />
    </>
  );
}

export default App;
