import { useEffect, useState } from "react";
import { book_from_db, google_api_call } from "../utilities";
import { useOutletContext } from "react-router-dom";

//bootstrap stuff
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/esm/Button";

function BookCard({bookInfo}) {
  let { user } = useOutletContext();







  /////////HOVER COMPONENT
  const renderTooltip = (props) => (
    <Tooltip id="card-tooltip" {...props}>
        {bookInfo.description}
    </Tooltip>
  );


 

  return (
    <>
      <Row xs={2} md={4} lg={6}>
        <Col>
          <OverlayTrigger id='bg-green'
            placement="right"
            delay={{ show: 200, hide: 800 }}
            overlay={renderTooltip}
          >
            <Card>
              <Card.Img variant="top" alt="Book Cover" src={bookInfo.img_url} />

              {/* <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body> */}
            </Card>
          </OverlayTrigger>
        </Col>
      </Row>
    </>
  );
}

export default BookCard;

// https://react-bootstrap.netlify.app/docs/layout/grid/#setting-column-widths-in-row

// src="https://lh3.googleusercontent.com/proxy/4UndnWnHQZaynYGtMDEe0DqYeTUSaPGJ3wJmouvRD5MdbgoawPjvq-VhmWX_tzmjoZLv7rhOcETN1fuq5APANgaL-VTziASjLepnuDm8CIFUxWuoY06XxFg" />






//   const [book_description, setBookDescription] = useState("");
//   const [pic, setPic] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       let book_info;

//       if (user) {
//         book_info = await book_from_db();
//         console.log("CARD-USER", book_info);
//       } else {
//         book_info = await google_api_call('harry potter');
//         console.log("CARD-NO user", book_info);
//       }

//       const {
//         title,
//         author,
//         description,
//         api_rating,
//         page_count,
//         genre,
//         img_url,
//       } = book_info;
//       // img_url = book_info['img_url']
//       setBookDescription(description);
//       setPic(img_url);
//     }
//     fetchData();
//   }, []);



// const [isExpanded, setIsExpanded] = useState(false)
//  const toggleExpanded = () => setIsExpanded(!isExpanded);

//   let short_descript = book_description.split(" ");
//  const shouldTruncate = book_description.length > 50;
//  const displayText = isExpanded
//    ? book_description
//    : short_descript.slice(0, 50).join(" ") + (shouldTruncate ? "..." : "");


//   /////////HOVER COMPONENT
//   const renderTooltip = (props) => (
//     <Tooltip id="card-tooltip" {...props}>

//       {displayText}
//       <Button variant="success" onClick={toggleExpanded}></Button>
//     </Tooltip>
//   );
//   return (
//     <>
//       <Row xs={2} md={4} lg={6}>
//         <Col>
//           <OverlayTrigger id='bg-green'
//             placement="right"
//             delay={{ show: 200, hide: 800 }}
//             overlay={renderTooltip}
//           >
//             <Card>
//               <Card.Img variant="top" alt="Book Cover" src={pic} />

//               {/* <Card.Body>
//                   <Card.Title>Card title</Card.Title>
//                   <Card.Text>
//                     This is a longer card with supporting text below as a
//                     natural lead-in to additional content. This content is a
//                     little bit longer.
//                   </Card.Text>
//                 </Card.Body> */}
//             </Card>
//           </OverlayTrigger>
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default BookCard;