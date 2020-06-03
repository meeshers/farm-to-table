
let shoppingCart = [];

$(document).ready( () => {
    const retrieve = JSON.parse(localStorage.getItem("shoppingCart"));
    //$('#button__clear-cart').show();

    if(retrieve !== null)
    {
        shoppingCart = retrieve;

        shoppingCart.forEach(element => {
            //const itemName = element.name;
            //const itemID = element.id;
            //const itemUrl = element.url
            const addItem = `<tr>
                                <td class="td__first">
                                    <a href="/product/${element.id}">
                                        <img src='${element.url}'>
                                    </a>
                                    <p>${element.name}</p>
                                    <p>${element.desc}</p>
                                </td>
                                <td>${element.price}</td>
                                <td>
                                <i class="fas fa-angle-left"></i>
                                    <p 
                                <i class="fas fa-angle-right"></i>
                                </td>
                                <td>total</td>
                             </tr>`;
            $('#table__items').append(addItem);
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