let shoppingCart = [];

$(document).ready( () => {
    const retrieve = JSON.parse(localStorage.getItem("shoppingCart"));

    if(retrieve !== null)
    {
        shoppingCart = retrieve;
    }
})

$('.button__add-to-cart').click( ()=> {
    const name = $('#prod-name').text();
    const id = $('#prod-id').val();

    const item = {
        id: id,
        name: name
    }

    shoppingCart.push(item);

    $('#a__cart').text(`Cart(${shoppingCart.length})`);

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    localStorage.setItem("cartLabel", `Cart(${shoppingCart.length})`);

    window.location.replace('/products');
})