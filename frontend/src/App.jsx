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

function App() {
  const [user, setUser] = useState(useLoaderData());
  const [searchValue, setSearchValue] = useState('');
  const [myshelves, setMyShelves] = useState([]);


  // let outletObj = {
  //   user,
  //    setUser,
  // }

  return (
    <>
      <NavBar user={user} setUser={setUser} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Outlet context={{ user, setUser, myshelves, setMyShelves }} />
    </>
  );
}

export default App;
