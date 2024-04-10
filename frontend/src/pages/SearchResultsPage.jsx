import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import BookCard from "../components/Card";
import { book_from_db, google_api_call } from "../utilities";

//bootstrap stuff


function SearchResultsPage(){
    let { bookInfo } = useOutletContext();
  const { searchInput } = useParams();




    
    return (
      <React.Fragment>
        <h1>Search Results Page</h1>
        <div className="aBookPageContainer">
          <div className="leftSideContainer">
            <img className="bookCoverImage" src={bookInfo.img_url} />
            <ButtonAddRemove book_info={bookInfo} />
          </div>
          <div className="bookInfoContainer">
            <h2 className="bookInfoItem">{bookInfo.title}</h2>
            <h5 className="bookInfoItem">{bookInfo.author}</h5>
            <h6 className="bookInfoItem">{bookInfo.api_rating}⭐</h6>
            <p className="bookInfoItem">{bookInfo.description}</p>
            <p className="bookInfoItem">
              Genre: <b>{bookInfo.genre && bookInfo.genre[0]}</b>
            </p>
            <span>{bookInfo.page_count} pages</span>
          </div>
        </div>
      </React.Fragment>
    );
}

export default SearchResultsPage