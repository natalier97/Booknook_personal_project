import { useEffect, useState } from "react";
import { book_from_db, google_api_call } from "../utilities";
import { useOutletContext, useNavigate } from "react-router-dom";

//bootstrap stuff
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";




function BookCard({ bookInfo, height, width }) {
  let { setABookInfo } = useOutletContext();
  let navigate = useNavigate();

  function navigateToBookPage(book_title) {
    setABookInfo(bookInfo);
    let route = `/book/${book_title}/`;
    navigate(route);
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  
  let short_descript = bookInfo.description.split(" ");
  const shouldTruncate = bookInfo.description.length > 80;
  const displayText = isExpanded
    ? bookInfo.description
    : short_descript.slice(0, 80).join(" ") + (shouldTruncate ? "..." : "");

  /////////HOVER COMPONENT
  const renderTooltip = (props) => (
    <Tooltip onClick={toggleExpanded} id="card-tooltip" {...props}>
      {/* {bookInfo.description} */}
      {displayText}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        id="bg-green"
        placement="right"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltip}
        flip={true}
      >
        <Card style={{ height: height, width: width }}>
          <Card.Img
            tabIndex="0"
            role="button"
            style={{ height: height, width: width }}
            variant="top"
            alt="Book Cover"
            src={bookInfo.img_url}
            onClick={() => navigateToBookPage(bookInfo.title)}
          />

        </Card>
      </OverlayTrigger>
    </>
  );
}

export default BookCard;

// https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row

// src="https://lh3.googleusercontent.com/proxy/4UndnWnHQZaynYGtMDEe0DqYeTUSaPGJ3wJmouvRD5MdbgoawPjvq-VhmWX_tzmjoZLv7rhOcETN1fuq5APANgaL-VTziASjLepnuDm8CIFUxWuoY06XxFg" />

// xs={2} md={4} lg={6}
