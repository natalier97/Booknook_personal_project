import {useOutletContext, useNavigate, useParams} from "react-router-dom"
import { delete_a_shelf } from "../utilities";

//bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";







function BookTable({shelfArray}) {
  //  #[{"id", "shelf_name", "book"}. {shelf_obj}];
  //  #shelf_obj = {"id", "shelf_name", "book"}; book = [{title, author, description, api_rating, page_count, genre, img-url}, {}]

  let { myshelves, aBookInfo, setABookInfo } = useOutletContext();
  let navigate = useNavigate();
  const { shelfName } = useParams();
   let baseShelves = [
     "currently reading",
     "read",
     "favorites",
     "want to read",
     ":shelfName",
   ];


  function navigateToBookPage(book_title, bookInfo) {
    setABookInfo(bookInfo);
    let route = `/book/${book_title}/`;

    navigate(route); 
  }

  function renderTableElems() {
    let tempAllBooks = []; //--> array of book objs
    let bookIdSet = new Set();
    let bookShelfObj = {}; //object where the book is le key & value = shelves array
   
    

    for (let shelf of shelfArray) {
      for (let bookObj of shelf.book) {
        if (!bookIdSet.has(bookObj.isbn)) {
          tempAllBooks.push(bookObj);
          bookIdSet.add(bookObj.isbn);
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
          <td className="books-table-td">
            {" "}
            <img
              tabIndex="0"
              role="button"
              onClick={() => navigateToBookPage(book.title, book)}
              className="tableImg"
              src={book.img_url}
            ></img>
          </td>
          <td
            className="books-table-td"
            tabIndex="0"
            role="button"
            onClick={() => navigateToBookPage(book.title, book)}
          >
            {book.title}
          </td>
          <td className="books-table-td">{book.author}</td>
          <td className="books-table-td">
            {bookShelfObj[book.title].join(", ")}
          </td>
          <td className="books-table-td">{book.page_count}</td>
          <td className="books-table-td">{book.api_rating}</td>
        </tr>
      );
    });
  }

 function navigateToBookShelf() {
   let route = `/myBooksPage/:shelfName/`;
   navigate(route);
 }

  async function handleDeleteButton(shelfName){
    let response = await delete_a_shelf(shelfName);
    navigateToBookShelf();
    window.location.reload();
    console.log("BOOK TABLE", response)
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th className="books-table-th">cover</th>
          <th className="books-table-th">title</th>
          <th className="books-table-th">author</th>
          {/* <th>my rating</th> */}
          <th className="books-table-th">shelves</th>
          <th className="books-table-th">page count</th>
          {/* <th>booknook ratings</th> */}
          <th className="books-table-th">ratings</th>
        </tr>
      </thead>

      <tbody>
        {renderTableElems()}
        {baseShelves.includes(shelfName) ? null : (
          <tr>
            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteButton(shelfName)}>
              delete shelf
            </Button>
          </tr>
        )}
      </tbody>
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