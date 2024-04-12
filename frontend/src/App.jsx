import { useEffect, useState } from "react";
import "./App.css";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import { view_all_shelves, ny_times_api_call } from "./utilities";

function App() {
  const [user, setUser] = useState(useLoaderData());
  const [searchValue, setSearchValue] = useState('');
//  #[{"id", "shelf_name", "book"}. {shelf_obj}];
  const [myshelves, setMyShelves] = useState([]); 
  const [bookInfoArray, setBookInfoArray] = useState([]);
  const [aBookInfo, setABookInfo] = useState({})
  const [nytimesListObj, setNYTimesListObj] = useState({})

  
 async function view_shelves() {
   let shelves = await view_all_shelves();
   console.log("app.jsx shelves----", shelves);
   setMyShelves(shelves);
 }
 

  async function fetch_ny_times_data(){
    let lists_obj = await ny_times_api_call();
    console.log("APP.JSX nytimesdata---", lists_obj);
    setNYTimesListObj(lists_obj);
    // should return an object ##where key = list_name & value is array of bookObjs
  }
  useEffect(() => {
    view_shelves();
    fetch_ny_times_data();
  }, []);



  return (
    <>
    <div className='backgroundImage'></div>
      <NavBar user={user} setUser={setUser} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Outlet context={{ user, setUser, 
      myshelves, setMyShelves, view_shelves, 
        bookInfoArray, setBookInfoArray, 
        aBookInfo, setABookInfo,
        nytimesListObj }} />
    </>
  );
}

export default App;
