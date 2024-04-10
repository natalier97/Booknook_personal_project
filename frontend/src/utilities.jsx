import axios from "axios";


//creates axios instance
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

///////////USER CONFIRMATION/////////////////
export const userConfirmation = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    //returns user: first_name & "email": email
    let response = await api.get("bookusers/info/");
    if ((response.status = 200)) {
      console.log("USER CONFIRMED", response.data);
      return { user: response.data.user, email: response.data.email };
    } else {
      //response != 200
      console.log("ERROR - user NOT CONFIRMED", response);
      return null;
    }
    //no token found
  } else {
    console.log("NO TOKEN in local storage");
    return null;
  }
};

//going to take in email & password as args
export const userLogin = async (email, password) => {
  let response = await api.post("bookusers/login/", { email, password });

  //user: first_name & token will be returned
  if (response.status === 200) {
    const { user, token } = response.data;
    localStorage.setItem("token", token);

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    console.log("LOG IN SUCCESS!", response.data);
    return { user, email };
  } else {
    console.log("LOG IN ERROR", response);
  }
};

//going to take in email, password, first_name
export const userSignUp = async (email, password, first_name) => {
  let response = await api.post("bookusers/signup/", {
    email,
    password,
    first_name,
  });

  //user: first_name & token will be returned
  if (response.status === 201) {
    const { user, token } = response.data;
    localStorage.setItem("token", token);

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    console.log("SUCCESSFULLY SIGNED UP", response.data);
    return { user, email };
  } else {
    console.log("SIGN UP ERROR", response);
  }
};

//will return true or false if user is logged out
export const userLogout = async () => {
  let response = await api.post("bookusers/logout/");
  if ((response.status = 204)) {
    //delete token from axios header
    delete api.defaults.headers.common["Authorization"];
    //delete token from Localstorage
    localStorage.removeItem("token");

    console.log("LOGGED OUT!");
    return true;
  } else {
    console.log("ERROR LOGGING OUT", response);
    return false;
  }
};

////////////////////////////////////
//// BOOK_APP django stuff ////
/////////////////////////////////
export const book_from_db = async (book_name) => {
  const token = localStorage.getItem("token");
  

  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    // console.log("Book NAME", book_name)
    let response = await api.get(`books/user/${book_name}/`);

    console.log("BOOK_FROM_DB FUNC", response.data);
    if ((response.status = 200)) {
      console.log("RESPONSE = 200", response.data[0]);
      return response.data[0];
    } else {
      //response != 200 aka no book found
      return null;
    }
  }
  //no token found
  else {
    console.log("cant make db call -NO TOKEN in local storage");
    return null;
  }
};

export const google_api_call = async (book_name) => {
  let response = await api.get(`books/nonuser/${book_name}/`);
  console.log("GOOGLE_API_CALL FUNC", response.data);
  if ((response.status = 200)) {
    return response.data[0];
  } else {
    return null;
  }
};



////////////////////////////////////
//// SHELVES_APP  stuff ////
/////////////////////////////////

export const view_all_shelves = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    let response = await api.get(`shelves/as/allshelves/`);

    if ((response.status = 200)) {
      // console.log("view+all+shelves RESPONSE = 200", response.data);
      return response.data;

    } else {
      //response != 200, aka no user id found
      return null;
    }
  }
  //no token found
  else {
    console.log("cant view ALL SHELVES -no token in local storage");
    return null;
  }
};

export const view_a_shelf = async (shelf_name) => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    // /shelves/<str:shelf_name>/
    let get_response = await api.get(`/shelves/${shelf_name}/`);

    if ((get_response.status = 200)) {
      console.log("a_shelf GET response = 200", get_response.data[0]);
      return get_response.data[0];
    } else {
      //response != 200 aka no shelf found
      return null;
    };
  }
  //no token found
  else {
    console.log("no token in local storage -cant view A SHELF");
    return null;
  }
};


////////////////////////////////////////
//// ADDING/REMOVING BOOK TO A SHELF ////
///////////////////////////////////////

export const addremove_to_a_shelf = async (shelf_name, book_info_obj) => {
  // book_info_obj = {"action": 'add' / 'remove', 'book':{book info} }

  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;


    // /shelves/<str:shelf_name>/
    let get_response = await api.post(`/shelves/${shelf_name}/`, book_info_obj);

    if ((get_response.status = 200)) {
      console.log("a_shelf POST response = 200", get_response.data[0]);
      return true;
    } else {
    
      return false;
    }
  }
  //no token found
  else {
    console.log("no token in local storage--cant access A SHELF -");
    return null;
  }
};

  // request_body = {
    //   title,
    //   author,
    //   description,
    //   page_count,
    //   genre,
    //   img_url,
    // }; //isbn, api_rating, id

    // /* conditionally adding isbn, api_rating, and/or id*/
    // if()
