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
})

$('#sign-out').click(() => {

    localStorage.removeItem("signedIn");
})