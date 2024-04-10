import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import BookCard from "../components/Card";
import { book_from_db, google_api_call } from "../utilities";
import ButtonAddRemove from "../components/ButtonAddRemove";
//bootstrap stuff

// path: "/book/:bookName/",

function ABookPage(){
    let { aBookInfo } = useOutletContext();
  const { searchInput } = useParams();


    
    return (
      <React.Fragment>
        <div className="aBookPageContainer">
          <div className="leftSideContainer">
            <img className="bookCoverImage" src={aBookInfo.img_url} />
            <ButtonAddRemove book_info={aBookInfo} />
          </div>
          <div className="bookInfoContainer">
            <h2 className="bookInfoItem">{aBookInfo.title}</h2>
            <h5 className="bookInfoItem">{aBookInfo.author}</h5>
            <h6 className="bookInfoItem">{aBookInfo.api_rating}⭐</h6>
            <p className="bookInfoItem">{aBookInfo.description}</p>
            <p className="bookInfoItem">
              Genre: <b>{aBookInfo.genre && aBookInfo.genre[0]}</b>
            </p>
            <span>{aBookInfo.page_count} pages</span>
          </div>
        </div>
      </React.Fragment>
    );
}

export default ABookPage