$(document).ready(() => {
  const signedIn = localStorage.getItem("signedIn");

  if(signedIn !== null && signedIn === "true")
  {
    $('#sign-in').hide();
    $('#user-profile').show();
    $('#sign-out').show();
  }
  else
  {
    $('#sign-in').show();
    $('#user-profile').hide();
    $('#sign-out').hide();
  }
});

$('#sign-out').click(() => {
  //remove all the local storage associated with the user when they logout
  localStorage.removeItem("shoppingCart");
  localStorage.removeItem("cartLabel");
  localStorage.removeItem("signedIn");
  localStorage.removeItem("__ch");
  localStorage.removeItem("__nm");
});