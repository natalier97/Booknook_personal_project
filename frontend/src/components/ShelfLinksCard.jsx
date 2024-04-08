import React, { useEffect, useState } from "react";
import { book_from_db, google_api_call } from "../utilities";
import { useOutletContext, useNavigate } from "react-router-dom";

//bootstrap stuff
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//  #["id", "shelf_name", "book"];

function ShelfLinksCard({ shelfInfo }) {
  let navigate = useNavigate();
  let { user, myshelves, setMyShelves } = useOutletContext();

  function navigateToBookShelf(shelfName) {
    let route = `/myBooksPage/${shelfName}/`;
    navigate(route);
  } //onClick={navigateToBookPage}

  
    function renderCardLinks() {
      return myshelves.map((shelf) => {
        return (
          <div key={shelf.id}>
            <Card.Link onClick={() => navigateToBookShelf(shelf["shelf_name"])}>
              {shelf["shelf_name"]}
            </Card.Link>
          </div>
        );
      });
    };
  

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

//    <Card style={{ width: "18rem" }}>
//         <Card.Body>
//           <Card.Title>Bookshelves</Card.Title>

//           <Card.Subtitle className="mb-2 text-muted">
//             {shelfInfo[0] && shelfInfo[0]["shelf_name"]}
//           </Card.Subtitle>
//           <Card.Text>{/* {shelfInfo[1].shelf_name} */}</Card.Text>
//           <Card.Link href="#">Card Link</Card.Link>
//           <Card.Link href="#">Another Link</Card.Link>
//         </Card.Body>
//       </Card>
