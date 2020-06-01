$('.delete-prod').click((event) => {
    // event.preventDefault();
    // const $el = $(this);
    // const x = $el.attr("id");
    // const y = event.pageY;
    // //let offset = event.offsetTop;
    // console.log(x);
    // //alert(x);
    // alert("Are you sure you want to delete this item?\nThe position is: " + x + " : " + y);

    //$('.delete-item').css("top", `${y}px`);
    //$('.delete-item').css("left", `${x}px`);
});

$('#prod-url').blur(() => {
    const url = $('#prod-url').val();
    $('#prod-img').attr("src", url);
})