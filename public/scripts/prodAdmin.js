$(document).ready( () => {
    $('.header__title h3').text("Product Admin");

    const url = $('#prod-url').val();
    $('#prod-img').css("background-image", `url(${url})`);
});

$('#prod-url').blur(() => {
    const url = $('#prod-url').val();
    $('#prod-img').css("background-image", `url(${url})`);
})

$('.header__logo').click(() => {
    window.location.href = "/admin";
});

$('.btn-back').click(() => {
    window.history.back();
});