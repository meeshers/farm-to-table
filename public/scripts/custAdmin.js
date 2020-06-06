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

$('.input__user-name').focusout( () => {
    $('.input__user-name').val(toTitleCase($('.input__user-name').val()));
});

$('.input__user-address').focusout( () => {
    $('.input__user-address').val($('.input__user-address').val().toUpperCase());
});

$('.input__user-city').focusout( () => {
    $('.input__user-city').val($('.input__user-city').val().toUpperCase());
});

$('.input__user-state').focusout( () => {
    $('.input__user-state').val($('.input__user-state').val().toUpperCase());
});

$('.input__user-email').focusout( () => {
    $('.input__user-email').val($('.input__user-email').val().toLowerCase());
});

/**
 * @description Accepts a string and return the string with title case
 * @param {value} string 
 * @returns {string} The string provided in title case
 */
function toTitleCase(value)
{
    const title = value.split(" ");

    for(let i = 0; i < title.length; i++)
    {
        title[i] = title[i][0].toUpperCase() + title[i].slice(1);
    }

    return title.join(" ");
}