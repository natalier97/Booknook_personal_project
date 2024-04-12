import React, { useEffect, useState } from "react";
import BookCard from "../components/Card";
import { useOutletContext, useNavigate } from "react-router-dom";
import { google_api_call, book_from_db } from "../utilities";


//bootstrap stuff
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


function NYTimesComponent() {
  // should return an object ##where key = list_name & value is array of bookObjs
  let { nytimesListObj, user, setABookInfo } = useOutletContext();
  let navigate = useNavigate();

  function navigateToBookPage(book_title, book_info) {
    console.log("navigate to book page", book_title, book_info);
    setABookInfo(book_info);
    let route = `/book/${book_title}/`;
    navigate(route);
  }

  async function fetchBookData(isbn) {
    if (user) {
      // console.log("im a user")
      let temp_book_info = await book_from_db(`isbn:${isbn}`);

      // console.log("user- nytime component ---", temp_book_info);
      return temp_book_info[0];
    } else {
      let temp_book_info = await google_api_call(`isbn:${isbn}`);
      // console.log("notauser- nytime component ---", temp_book_info);
      return temp_book_info[0];
    }
  }

  async function handleOnClick(isbn_num, title) {
    let book_info = await fetchBookData(isbn_num);
    navigateToBookPage(title, book_info);
  }


  /////////HOVER COMPONENT
  const renderTooltip = (props) => (
    <Tooltip onClick={toggleExpanded} id="card-tooltip" {...props}>
      {/* {bookInfo.description} */}
      {displayText}
    </Tooltip>
  );


  function renderBooks() {
    return Object.keys(nytimesListObj).map((key, index) => {
      return (
        <div key={index}>
          <h4>{key}</h4>
          <div className="nytimesBookListContainer">
            {nytimesListObj[key].map((book, index) => {
              //  let bookInfo = fetchBookData(book.primary_isbn13);

              console.log("RENDER BOOKS FUNCT");
              return (
                <div key={index} className="nytimes-cover-tooltip-container">
                  <img
                    className="nytimes-cover-pic"
                    tabIndex="0"
                    role="button"
                    src={book.book_image}
                    onClick={() =>
                      handleOnClick(book.primary_isbn13, book.title)
                    }
                  ></img>
                  <div className="tooltip">{book.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <h2>NY TIMES BEST SELLERS</h2>
      {renderBooks()}
    </>
  );
}

export default NYTimesComponent;

 //  [
  //    "Advice, How-To & Miscellaneous",
  //    "Young Adult Hardcover",
  //    "Hardcover Fiction",
  //    "Hardcover Nonfiction",
  //  ];

  // ["books"] ---> an array of book objects in this list
  //     #         "author", "book_image", "description", "title", "rank"(int), "primary_isbn13"

