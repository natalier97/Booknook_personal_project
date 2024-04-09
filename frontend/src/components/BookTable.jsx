import {useOutletContext} from "react-router-dom"

//bootstrap
import Table from "react-bootstrap/Table";
import { useState } from "react";

function BookTable({shelfArray}) {
  //  #[{"id", "shelf_name", "book"}. {shelf_obj}];
  let { myshelves } = useOutletContext();

  const [allBooks, setAllBooks] = useState([]);

  //  #shelf = {"id", "shelf_name", "book"}; book = [{title, author, description, api_rating, page_count, genre, img-url}, {}]

  function renderTableElems() {
    let tempAllBooks = []; //--> array of book objs
    let bookIdSet = new Set();
    let bookShelfObj = {}; //object where the book is le key & value = shelves array

    for (let shelf of shelfArray) {
      for (let bookObj of shelf.book) {
        if (!bookIdSet.has(bookObj.id)) {
          tempAllBooks.push(bookObj);
          bookIdSet.add(bookObj.id);
        }

        if (bookShelfObj[bookObj.title]) {
          bookShelfObj[bookObj.title].push(shelf.shelf_name);
        } else {
          bookShelfObj[bookObj.title] = [shelf.shelf_name];
        }
      }
    }

    return tempAllBooks.map((book) => {
      return (
        <tr key={book.id}>
          <td>
            {" "}
            <img className="tableImg" src={book.img_url}></img>
          </td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{bookShelfObj[book.title].join(", ")}</td>
          <td>{book.page_count}</td>
          <td>{book.api_rating}</td>
        </tr>
      );
    });
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>cover</th>
          <th>title</th>
          <th>author</th>
          {/* <th>my rating</th> */}
          <th>shelves</th>
          <th>page count</th>
          {/* <th>booknook ratings</th> */}
          <th>ratings</th>
        </tr>
      </thead>
      <tbody>{renderTableElems()}</tbody>
    </Table>
  );
}

export default BookTable;
// {
//   Array.from({ length: 12 }).map((_, index) => (
//     <th key={index}>Table heading</th>
//   ));
// }


{/* <tr>
          <td>2</td>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>3</td>
          {Array.from({ length: 12 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr> */}