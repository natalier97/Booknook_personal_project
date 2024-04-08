import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import BookCard from "../components/Card";
import { book_from_db, google_api_call } from "../utilities";


//bootstrap stuff




//  renders on path: "bookPage/:searchInput/"

   function ABookPage() {
    const [bookInfo, setBookInfo] = useState({}); 
    let {user} = useOutletContext();
    const {searchInput} = useParams();


    useEffect(() => {

      async function fetchData() {
        if (user) {
          console.log("im a user")
          let temp_book_info = await book_from_db(searchInput);
          
          console.log("CARD-USER", temp_book_info);
          setBookInfo(temp_book_info)
        } else {
          let temp_book_info = await google_api_call(searchInput);
          console.log("CARD-NO user", temp_book_info);
          setBookInfo(temp_book_info)
        } }
      fetchData();
    }, [searchInput]);

 
     return (
      <>
        <div><BookCard bookInfo={bookInfo} /></div>
      </>
     )
   };

export default ABookPage;
