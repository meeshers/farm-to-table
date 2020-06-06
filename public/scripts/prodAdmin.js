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

$('#toggle-deleted-prods').click(() => {
    $('.hide-prod').toggle();

    //show or hide the deleted products
    if($('.hide-prod').is(":visible"))
        $('.hide-prod').css("display", "table-row");
    else
        $('.hide-prod').css("display", "none");

    //upate the button text to reflect current state
    if($('#toggle-deleted-prods').text() === "Show Deleted")
        $('#toggle-deleted-prods').text("Show Active");
    else
        $('#toggle-deleted-prods').text("Show Deleted");

    $('.show-prod').toggle();
});