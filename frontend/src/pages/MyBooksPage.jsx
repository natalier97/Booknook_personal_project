import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ShelfLinksCard from "../components/ShelfLinksCard";
import BookTable from "../components/BookTable";
import { view_a_shelf } from "../utilities";

// "/myBooksPage/:shelfName/"
function MyBooksPage() {
  let { myshelves } = useOutletContext();
  const { shelfName } = useParams();

  const [aShelf, setAShelf] = useState([]);

  useEffect(() => {
    if (shelfName != ":shelfName") {
      async function view_shelf() {
        let shelf = await view_a_shelf(shelfName);
        console.log("my books page shelf", shelf);
        setAShelf(shelf);
      }
      view_shelf();
    }
  }, [shelfName]);

  console.log("aShelf:", aShelf);
  return (
    <React.Fragment>
      <div className="myBooksPageContainer">
        <div className="myBooksPageLeftSideContainer">
          <ShelfLinksCard />
        </div>
        <div className="myBooksPageRightSideContainer">
          {shelfName === ":shelfName" ? (
            <BookTable shelfArray={myshelves} />
          ) : (
            aShelf.length && <BookTable shelfArray={aShelf} />
          )}
          {/* <BookTable shelfArray={myshelves} /> */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default MyBooksPage;
