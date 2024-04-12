import { useState, useEffect } from "react";
import { view_a_shelf, view_all_shelves } from "../utilities";
import {useOutletContext} from  "react-router-dom";
import ShelfLinksCard from "../components/ShelfLinksCard";
import ButtonAddRemove from "../components/ButtonAddRemove";
import BookCard from "../components/Card";
//bootstrap stuff



function UserHomePage() {
  let { user, myshelves } = useOutletContext();
  //  #myshelves = [{"id", "shelf_name", "book"}. {shelf_obj}];
  //  #shelf_obj = {"id", "shelf_name", "book"}; book = [{title, author, description, api_rating, page_count, genre, img-url}, {}]

function renderCurrReadCards(){

  let currentlyReadingArr = []
  for (let shelf of myshelves){
  console.log("userhomepage", shelf.shelf_name, shelf.book);

  if (currentlyReadingArr.length >= 3){
      break
    }
  if (shelf.shelf_name === 'currently reading'){
    for (let bookObj of shelf.book){
      currentlyReadingArr.push(bookObj) 
    }
    };}
  console.log("userhomepage --- ARRAY", currentlyReadingArr);

    return currentlyReadingArr.map((aBook) => {
  console.log("userhomepage ---currentlyreading A BOOK", aBook);

      return (
        <div className="homePageBookCoverImgAndDescriptionContainer">
          <div className="homePageBookCoverImg" key={aBook.id}>
            <BookCard height="35vh" width="12vw" bookInfo={aBook} />
          </div>
          {aBook.description}
        </div>
      );
    })
};



function renderWantReadCards() {
  let wantToReadArr = [];
  for (let shelf of myshelves) {
    if (wantToReadArr.length >= 3) {
      break;
    }
    if (shelf.shelf_name === "want to read") {
       for (let bookObj of shelf.book) {
         wantToReadArr.push(bookObj);
       }
      // wantToReadArr.push(shelf.book);
    }
  }

  return wantToReadArr.map((aBook) => {
    return (
      <div className="homePageBookCoverImgAndDescriptionContainer">
        <div className="homePageBookCoverImg" key={aBook.id}>
          <BookCard height="35vh" width="12vw" bookInfo={aBook} />
        </div>
        {aBook.description}
      </div>
    );
  });
}



  return (
    <>
      <div className="userHomePageContainer">
        <div className="userHomePageLeftSide">
          <ShelfLinksCard />
        </div>

        <div className="userHomePageRightSide">
          <h3 className="userHomePageHeader">Currently Reading</h3>
          {renderCurrReadCards()}
          <div className='spacer'></div>
          <h3 className="userHomePageHeader">Want to Read</h3>
          {renderWantReadCards()}
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
