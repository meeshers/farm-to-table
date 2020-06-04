
let shoppingCart = [];

$(document).ready( () => {
    const retrieve = JSON.parse(localStorage.getItem("shoppingCart"));
    //$('#button__clear-cart').show();

    if(retrieve !== null)
    {
        shoppingCart = retrieve;

        for(let i = 0; i < shoppingCart.length; i++) {
            //const itemName = element.name;
            //const itemID = element.id;
            //const itemUrl = element.url
            const addItem = `<tr>
                                <td class="td__first">
                                    <a href="/product/${shoppingCart[i].id}">
                                        <img src='${shoppingCart[i].url}'>
                                    </a>
                                    <p>${shoppingCart[i].name}</p>
                                    <p class="p__desc">${shoppingCart[i].desc}</p>
                                </td>
                                <td class="td__price">
                                    <input id="price-${i}" class="input__price" type="text" value="${shoppingCart[i].price}">
                                </td>
                                <td class="td__qty">
                                <i id="dec-${i}" class="fas fa-angle-left fa-lg"></i>
                                    <input id="qty-${i}" type="text" class="input__prod-qty" value="1" readonly>
                                <i id="inc-${i}" class="fas fa-angle-right fa-lg"></i>
                                </td>
                                <td class="td__total">
                                    <input id="total-${i}" class="input__total" type="text" value="${shoppingCart[i].price}">
                                </td>
                             `;
            $('#table__items').append(addItem);
            updateCartTotal(stripDollar(shoppingCart[i].price));
        }

        $('.fa-angle-left').click( (event) => {
            const $qty = $(`#qty-${getItemNum(event.target.id)}`);
            const $price = $(`#price-${getItemNum(event.target.id)}`);
            const $total = $(`#total-${getItemNum(event.target.id)}`);
            let newQty = parseInt($qty.val()) - 1;
            if(newQty >= 0)
            {
                $qty.val(newQty);
                const newItemTotal = calcTotalPrice(stripDollar($price.val()), newQty);
                $total.val(newItemTotal);
            }

            if(newQty >= 0)
                updateCartTotal(stripDollar($price.val()), false);
            else
                updateCartTotal(0, false);
        });
        
        $('.fa-angle-right').click( (event) => {
            const $qty = $(`#qty-${getItemNum(event.target.id)}`);
            const $price = $(`#price-${getItemNum(event.target.id)}`);
            const $total = $(`#total-${getItemNum(event.target.id)}`);
            let newQty = parseInt($qty.val()) + 1;

            if(newQty <= 10)
            {
                $qty.val(newQty);
                const newItemTotal = calcTotalPrice(stripDollar($price.val()), newQty);
                $total.val(newItemTotal);
            }
            
            if(newQty <= 10)
                updateCartTotal(stripDollar($price.val()));
            else
                updateCartTotal(0, false);
        });

        // $('#button__clear-cart').show();
    }
});

$('#button__clear-cart').click(() => {
    alert("You are clearing the cart!");
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("cartLabel");
    shoppingCart = [];
    location.reload();
});

/**
 * @description Takes an element id formated like name-1 and returns the 1
 * @param {string} elementID
 * @returns {string} The number portion of the element id
 */
function getItemNum(elementID){
    const split = elementID.split("-");

    return split[1];
}

/**
 * @description Takes a price formated as $x.xx and strips the $
 * @param {string} price 
 * @returns {number} returns the price as a float value
 */
function stripDollar(price) {
    const split = price.split("$");

    return parseFloat(split[1]);
}

/**
 * @description Takes the quantity and price and returns a formated dollar string
 * @param {number} price 
 * @param {number} qty 
 * @returns {number} A value with two trailing zeros
 */
function calcTotalPrice(price, qty) {
    let total = (price * qty).toFixed(2);

    return `$${total}`;
}

/**
 * @description Updates the cart total as the qty's change. Accepts a number that is the
 * item price and boolean to tell function to add or subtract the price from the cart total. 
 * @param {number} newPrice 
 * @param {boolean} isAdd default true
 */
function updateCartTotal(itemPrice, isAdd=true) {
    let currentTotal = 0;
    
    if(isAdd)
        currentTotal = stripDollar($('#cart-total').val()) + itemPrice;
    else
        currentTotal = stripDollar($('#cart-total').val()) - itemPrice;

    $('#cart-total').val(calcTotalPrice(currentTotal, 1));
}