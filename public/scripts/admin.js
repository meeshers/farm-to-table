$(document).ready( () => {
    $('.header__title h3').text("Administration Home");
});

$('#prod-url').blur(() => {
    const url = $('#prod-url').val();
    $('#prod-img').attr("src", url);
})