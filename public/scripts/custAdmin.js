$(document).ready( () => {
    $('.header__title h3').text("Customer Admin");
});

$('.header__logo').click(() => {
    window.location.href = "/admin";
});

$('#btn__clear-cust-form').click(() => {
    $('#form__new-user').trigger('reset');
});

$('.btn-back').click(() => {
    window.history.back();
});

$('#button__update-password').click( () => {
    $('#button__update-password').hide();
    $('#input__admin-password').show();
    $('#input__admin-password').attr("minlength", 5);
    $('#input__admin-password').attr("required", true);
    $('#pass-updated').val("true");
});

$('#btn__open-order-history').click( () => {
    $('.div__order-history').toggle();
    $('#btn__open-order-history').toggle();
});

$('#btn__close-order-history').click( () => {
    $('.div__order-history').toggle();
    $('#btn__open-order-history').toggle();
});

function getDateString(date) {
    const dateSplit = date.split("GMT");

    return dateSplit[0];
}