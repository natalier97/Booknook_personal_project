import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { create_a_shelf } from "../utilities";

//bootstrap stuff
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ShelfLinksCard() {
  let navigate = useNavigate();
  //  #["id", "shelf_name", "book"];
  let { myshelves, setMyShelves } = useOutletContext();

  function navigateToBookShelf(shelfName) {
    let route = `/myBooksPage/${shelfName}/`;
    navigate(route);
  }

  function renderCardLinks() {
    return myshelves.map((shelf) => {
      let numOfBooks = shelf.book.length;
      
      return (
        <div key={shelf.id}>
          <Card.Link onClick={() => navigateToBookShelf(shelf["shelf_name"])}>
            {/* {numOfBooks} {"  "} {shelf["shelf_name"]}  */}
            {numOfBooks} {"   "} {shelf["shelf_name"]}
          </Card.Link>
          
        </div>
      );
    });
  }

useEffect(() =>{
renderCardLinks()
}, [myshelves])



  //------------MODAL STUFF---------
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[newShelfInput, setNewShelfInput] = useState("")

  async function addAShelf(newShelfInput){
    let new_shelf = await create_a_shelf(newShelfInput)
    window.location.reload();
    setMyShelves(...myshelves, new_shelf)
  }

  function handleAddButton(){
    handleClose();
    console.log("SHELFLINKS CARD -- handle add button")
    addAShelf(newShelfInput);
    
  }

  //------------------------------------------------------
  return (
    <React.Fragment>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col xs={9}>
                <Card.Title>Bookshelves</Card.Title>
              </Col>
              <Col>
                <Card.Img
                  onClick={handleShow}
                  tabIndex="0"
                  role="button"
                  style={{ height: "2.7vh", width: "2vw" }}
                  src="../../assets/plus2.JPG"
                />
              </Col>
            </Row>
          </Container>
          {renderCardLinks()}
        </Card.Body>
      </Card>
      {/* ----------------------MODAL STUFF ------------------------ */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a BookShelf</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>enter a bookshelf name</Form.Label>

              <Form.Control onChange={(event) => setNewShelfInput(event.target.value)} placeholder="'dystopian', 'unfinishable books', 'etc.'" type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddButton}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
export default ShelfLinksCard;
