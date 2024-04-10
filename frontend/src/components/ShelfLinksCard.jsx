import React, { useEffect, useState } from "react";
import { book_from_db, google_api_call } from "../utilities";
import { useOutletContext, useNavigate } from "react-router-dom";

//bootstrap stuff
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ShelfLinksCard() {
  let navigate = useNavigate();
  //  #["id", "shelf_name", "book"];
  let { myshelves } = useOutletContext();

  function navigateToBookShelf(shelfName) {
    let route = `/myBooksPage/${shelfName}/`;
    navigate(route);
  }

  function renderCardLinks() {
    return myshelves.map((shelf) => {
      let numOfBooks = shelf.book.length
      return (
        <div key={shelf.id}>
          <Card.Link onClick={() => navigateToBookShelf(shelf["shelf_name"])}>
            {numOfBooks} {"  "}  {shelf["shelf_name"]}
          </Card.Link>
        </div>
      );
    });
  }

  //------------------------------------------------------
  return (
    <React.Fragment>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Bookshelves</Card.Title>
          {renderCardLinks()}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}
export default ShelfLinksCard;
