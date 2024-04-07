import { useEffect, useState } from "react";
import { book_from_db, google_api_call } from "../utilities";
import { useOutletContext } from "react-router-dom";

//bootstrap stuff
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function BookCard() {
  const renderTooltip = (props) => (
    <Tooltip id="card-tooltip" {...props}>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
      2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
      College in Virginia, looked up one of the more obscure Latin words,
    </Tooltip>
  );

  let { user } = useOutletContext(); 

  const [pic, setPic] = useState('')

  useEffect(() => {
    async function fetchData() {
      let data;

      if (user){
      data = await book_from_db()
      console.log("CARD-USER", data)
      } else {
      data = await google_api_call();
      console.log("CARD-NO user", data);
      }

      let result = data['img_url']
      setPic(result)

    };
    fetchData();

  }, [])
 

  return (
    <>
      <Row xs={2} md={4} lg={6}>
        <Col>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Card>
              <Card.Img
                variant="top"
                alt="Book Cover"
                src={pic}
              />

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
