import axios from "axios";



//creates axios instance 
export const api = axios.create({
    baseURL:  "http://127.0.0.1:8000/api/v1/"
});


///////////USER CONFIRMATION/////////////////
export const userConfirmation = async() => {
    let token = localStorage.getItem("token");
    if (token){
        api.defaults.headers.common["Authorization"] = `Token ${token}`

        //returns user: first_name & "email": email
        let response = await api.get("bookusers/info/")
        if (response.status = 200){
            console.log("USER CONFIRMED", response.data)
            return {user: response.data.user, email: response.data.email}
        } else { //response != 200
            console.log("ERROR - user NOT CONFIRMED", response)
            return null
        };
    //no token found
    } else {
            console.log('NO TOKEN in local storage')
            return null
        };
    };




//going to take in email & password as args
export const userLogin = async(email,password) => {
    let response = await api.post("bookusers/login/", {email,password});

    //user: first_name & token will be returned
    if (response.status === 200){
        const {user, token} = response.data
        localStorage.setItem("token", token)

        api.defaults.headers.common['Authorization'] = `Token ${token}`

        console.log("LOG IN SUCCESS!", response.data)
        return {user, email}
    } else {
        console.log('LOG IN ERROR', response)
    };
};

//going to take in email, password, first_name
export const userSignUp = async(email, password, first_name) => {
  let response = await api.post("bookusers/signup/", {
    email,
    password,
    first_name,
  });

  //user: first_name & token will be returned
  if (response.status === 201){
    const {user, token} = response.data
    localStorage.setItem("token", token)

     api.defaults.headers.common["Authorization"] = `Token ${token}`;

     console.log("SUCCESSFULLY SIGNED UP", response.data)
     return {user, email}
  } else {
    console.log('SIGN UP ERROR', response)
  };
};



//will return true or false if user is logged out
export const userLogout = async() => {
    let response = await api.post("bookusers/logout/")
    if (response.status = 204) {
        //delete token from axios header
        delete api.defaults.headers.common["Authorization"]
        //delete token from Localstorage
        localStorage.removeItem("token")

        console.log("LOGGED OUT!")
        return true
    } else {
        console.log('ERROR LOGGING OUT', response)
        return false;
    }
}

