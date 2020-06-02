$(document).ready( () => {
    $('.header__title h3').text("Product Administration");
});

$('#prod-url').blur(() => {
    const url = $('#prod-url').val();
    $('#prod-img').attr("src", url);
})