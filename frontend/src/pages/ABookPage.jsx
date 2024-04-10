import { useState, useEffect } from "react";
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

//  renders on path: "bookPage/:searchInput/"

function ABookPage() {
  const [bookInfo, setBookInfo] = useState({});
  let { user } = useOutletContext();
  const { searchInput } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (user) {
        // console.log("im a user")
        let temp_book_info = await book_from_db(searchInput);

        console.log("A BOOK PAGE -- USER", temp_book_info);
        setBookInfo(temp_book_info);
      } else {
        let temp_book_info = await google_api_call(searchInput);
        console.log("A book page - NO user", temp_book_info);
        setBookInfo(temp_book_info);
      }
    }
    fetchData();
  }, [searchInput]);

  return (
    <>
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
    </>
  );
}

export default ABookPage;
