$(document).ready( ()=> {
    localStorage.setItem("signedIn", `true`);
    localStorage.setItem("__ch", $('#user-id').text());
    localStorage.setItem("__nm", $('#user-name').text());
})