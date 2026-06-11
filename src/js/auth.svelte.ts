
import { getLocalStorage, setLocalStorage } from "./utils.mts";
const baseURL = import.meta.env.PUBLIC_SERVER_URL;

// Create the interface for the user store.
interface UserStore {
 isLoggedIn:boolean,
 user?:{
     name:string
     email:string
     _id:string
 },
 token:string
}

// Set the userStore to default (
//     Not logged in
//     No user
//     No token
// )
export const userStore = $state( {isLoggedIn: false, user: {}, token: ""}) as UserStore;

export async function login(email:string, password:string) {
    
    // Make a fetch call to our login API endpoint.
    const res = await fetch(`${baseURL}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    const data = await res.json();

    // If our endpoint returns "ok",
    // update the userStore to hold the new data
    // and add the user to localStorage.
    if (res.ok) {
        userStore.user = data.user;
        userStore.isLoggedIn = true;
        userStore.token = data.token;
        setLocalStorage("so-user", userStore);
        return data;
    }

    // Throw an error if the response wasn't ok.
    else {
        throw new Error(data.error.message);
    }
}

// Set the userStore to default (
//     Not logged in
//     No user
//     No token
// )
export function logout() {
    userStore.isLoggedIn = false;
    userStore.user = undefined;
    userStore.token = "";
  
    setLocalStorage('so-user', null);
    window.location.href = "/"
}


export function checkAuth() {

    const userData = getLocalStorage("so-user");
    // console.log(userData)
    
    // If a user exists in local storage, populate the userStore
    if(userData) {
      userStore.user = userData.user
      userStore.token = userData.token;
      userStore.isLoggedIn = true;
    }
    
    // If not, set the userStore to the default (
    //     Not logged in
    //     No user
    //     No token
    // )
    else {
      userStore.isLoggedIn = false;
      userStore.user = undefined;
      userStore.token = "";
    }

    // Return true if there is userData, return false if there isn't.
    // The double bang !! turns a variable into a boolean.
    return !!userData;
}
