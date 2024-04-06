import { useEffect, useState } from 'react'
import './App.css'
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { api } from './utilities'
import axios from 'axios'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'





function App() {
const [user, setUser] = useState(useLoaderData())



// let outletObj = {
//   user,
//   setUser,
// }

  return (
    <>
    <NavBar user={user} setUser={setUser}/>
    <Outlet context={{user, setUser}} />
    

    </>
  )
}

export default App



  // async function test_connection(){
  //   let response = await api.get("test/")
  //   console.log(response.data)
  // };

// useEffect(() => {
//   test_connection();
// }, [])