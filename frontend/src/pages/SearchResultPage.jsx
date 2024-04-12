import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import BookCard from "../components/Card";
import { book_from_db, google_api_call } from "../utilities";
import ButtonAddRemove from "../components/ButtonAddRemove";
import { Spinner } from "react-bootstrap";


//bootstrap stuff

//  renders on path: "searchresults/:searchInput/"

function SearchResultsPage() {
  let { user, bookInfoArray, setBookInfoArray } = useOutletContext();
  const { searchInput } = useParams();
  

  useEffect(() => {
    async function fetchData() {
      setBookInfoArray([0, 0, 0, 0, 0])
      if (user) {
        // console.log("im a user")
        let temp_book_info = await book_from_db(searchInput);

        console.log("A BOOK PAGE -- USER", temp_book_info);
        setBookInfoArray(temp_book_info);
      } else {
        let temp_book_info = await google_api_call(searchInput);
        console.log("A book page - NO user", temp_book_info);
        setBookInfoArray(temp_book_info);
      }
    }
    fetchData();
  }, [searchInput]);


  console.log('SEARCH RESULT PAGE--book info array', bookInfoArray)

  function renderCards(){
    return bookInfoArray.map((aBook, index) => {
      return aBook === 0 ? (
        <div key={index} className="d-flex justify-content-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div key={index}>
          <BookCard height="40vh" bookInfo={aBook} />
        </div>
      );
    })
  }

  return (
    <>
      <div className="searchPageContainer">
        {renderCards()}
        </div>
    </>
  );
}

export default SearchResultsPage;
