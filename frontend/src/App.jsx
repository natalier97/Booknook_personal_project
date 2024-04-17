import { useEffect, useState } from "react";
import "./App.css";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
  useParams,
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


///////////////////----------HANDLING NO USER INFORMATION------------------
   const navigate = useNavigate();
   const location = useLocation();
   const {shelfName} = useParams();

  // let joinedShelfName = shelfName.join("%20")

  useEffect(() => {
    let nullUserUrls = [
      "/homePage/",
      "/myBooksPage/:shelfName/",
      `/myBooksPage/${shelfName ? shelfName.split(" ").join("%20") : null}/`,
    ]; // should redirect to landing page if logged out
    console.log(
      "USEFFECT-APP.JSX",
      location.pathname,
      shelfName ? shelfName.split(" ").join("%20") : null
    );
    // notAllowed=True if person is logged out and trying to access member-only urls
    let notAllowed = nullUserUrls.includes(location.pathname);
    console.log("notAllowed ", notAllowed);

    if (!user && notAllowed) {
      console.log("redirect to landing page");
      // we redirect because the user needs to log in before they do anything else
      navigate("/");
    }
  }, [user, location.pathname]);




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
