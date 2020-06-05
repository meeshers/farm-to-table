let shoppingCart = [];

$(document).ready( () => {
    const retrieve = JSON.parse(localStorage.getItem("shoppingCart"));

    if(retrieve !== null)
    {
        shoppingCart = retrieve;
    }
})

$('.button__add-to-cart').click( ()=> {
    
    const item = {
        id: $('#prod-id').val(),
        name: $('#prod-name').text(),
        url: $('#prod-image').attr('src'),
        price: $('#prod-price').text(),
        desc:  $('#prod-desc').text(),
        qty: 1
    }

    shoppingCart.push(item);

    $('#a__cart').text(`Cart(${shoppingCart.length})`);

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    localStorage.setItem("cartLabel", `Cart(${shoppingCart.length})`);

    window.location.replace('/products'); 
})