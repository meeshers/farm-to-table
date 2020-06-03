
let shoppingCart = [];

$(document).ready( () => {
    const retrieve = JSON.parse(localStorage.getItem("shoppingCart"));
    //$('#button__clear-cart').show();

    if(retrieve !== null)
    {
        shoppingCart = retrieve;

        shoppingCart.forEach(element => {
            const itemName = element.name;
            const itemID = element.id;
            const addItem = `<p>${itemName} - ${itemID}</p>`;
            $('#insert-prods').append(addItem);
        });

        $('#button__clear-cart').show();
        //alert(shoppingCart.length);
    }
})

$('#button__clear-cart').click(() => {
    alert("You are clearing the cart!");
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("cartLabel");
    shoppingCart = [];
    location.reload();
})