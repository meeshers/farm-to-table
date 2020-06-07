$(document).ready( () => {
    $('.header__title h3').text("Administration Home");
    $('#input__admin-password').removeAttr("minlength");
    $('#input__admin-password').removeAttr("required");
    $('#pass-updated').val("false");
});

$('.header__logo').click(() => {
    window.location.href = "/admin";
});

$('#button__update-password').click( () => {
    $('#button__update-password').hide();
    $('#input__admin-password').show();
    $('#input__admin-password').attr("minlength", 5);
    $('#input__admin-password').attr("required", true);
    $('#pass-updated').val("true");
});