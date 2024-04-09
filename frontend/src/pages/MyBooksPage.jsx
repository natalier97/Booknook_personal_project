import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ShelfLinksCard from "../components/ShelfLinksCard";
import BookTable from "../components/BookTable";



// "/myBooksPage/:shelfName/"
function MyBooksPage(){
    let { user, myshelves, setMyShelves } = useOutletContext();
    const {shelfName} = useParams();


    return (
        <React.Fragment>
            <h1>MY BOOKS</h1>
        <BookTable />
        </React.Fragment>
    )
};

export default MyBooksPage