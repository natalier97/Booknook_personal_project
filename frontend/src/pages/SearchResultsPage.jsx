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





    
    return (
      <React.Fragment>
        <h1>Search Results Page</h1>
      </React.Fragment>
    );
}

export default SearchResultsPage