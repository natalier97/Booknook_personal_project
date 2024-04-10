import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { addremove_to_a_shelf } from "../utilities";

//bootstrap
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function ButtonAddRemove({ book_info }) {
  let { myshelves, view_shelves, bookInfo } = useOutletContext();
  //  #shelf = {"id", "shelf_name", "book"}; book = [{title, author, description, api_rating, page_count, genre, img-url, isbn}, {}]
// const[updatedShelves, setUpdatedShelves] =  useState(myshelves)


// useEffect(()=>{
// console.log("hola amigo")
// }, [myshelves])


console.log('book iinfo', bookInfo)


  function isInShelf(shelf_name) {
    let action = "add";
    for (let shelf of myshelves) {
      if (shelf.shelf_name === shelf_name) {
        console.log("hola amigo")

        for (let book of shelf.book) {
          console.log('book loop goodbye')
            
          if ( book.isbn === bookInfo.isbn) {
            action = "remove";
            break;
          }
        }
      }
    }
    return action;
  }

  async function handleBooktoBookShelf(shelf_name) {
    // book_info_obj = {"action": 'add' / 'remove', 'book':{book info} }
   
    let book_info_obj = { action: isInShelf(shelf_name), book: bookInfo };
    //going to return true if book added to shelf
    let response = await addremove_to_a_shelf(shelf_name, book_info_obj);
    view_shelves()
  }
  // console.log('BOOk INFO ISBN', bookInfo.isbn)

  function renderDropdownItems() {
    return myshelves.map((shelf) => {
      return (
        <Dropdown.Item
          key={shelf.id}
          onClick={() => handleBooktoBookShelf(shelf.shelf_name)}
        >
          {isInShelf(shelf.shelf_name) === 'remove' ? '✔️ ' : " "}
         
          {shelf.shelf_name}
        </Dropdown.Item>
      );
    });
  }

  return (
    <>
      <DropdownButton
        variant="outline-success"
        id="dropdown-basic-button"
        title="Bookshelves"
      >
        {renderDropdownItems()}
      </DropdownButton>
    </>
  );
}

export default ButtonAddRemove;
