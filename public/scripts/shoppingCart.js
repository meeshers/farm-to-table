
let shoppingCart = [];

$(document).ready( () => {
    const signedIn = localStorage.getItem("signedIn");

    if(signedIn !== null && signedIn === "true")
    {
        const user = localStorage.getItem("__nm");
        $('#user-name').text(`Welcome: ${user}`);
    }
    else
        $('#user-name').text(`Welcome: Guest please sign in`);

    const retrieve = JSON.parse(localStorage.getItem("shoppingCart"));

    if(retrieve !== null)
    {
        let match = false;
        //check for duplicate items in the shopping cart and increase qty if there are
        for(let i = 0; i < retrieve.length; i++)
        {
            if(i === 0)
                shoppingCart.push(retrieve[i]);
            else
            {
                for(let j = 0; j < shoppingCart.length; j++)
                {
                    if(retrieve[i].id === shoppingCart[j].id)
                    {
                        shoppingCart[j].qty += 1;
                        match = true;
                    }
                }

                if(!match)
                    shoppingCart.push(retrieve[i]);
            }

            match = false;
        }

        for(let i = 0; i < shoppingCart.length; i++) {

            const itemTotal = calcTotalPrice(stripDollar(shoppingCart[i].price), shoppingCart[i].qty);
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
                                    <input id="qty-${i}" type="text" class="input__prod-qty" value="${shoppingCart[i].qty}" readonly>
                                <i id="inc-${i}" class="fas fa-angle-right fa-lg"></i>
                                </td>
                                <td class="td__total">
                                    <input id="total-${i}" class="input__total" type="text" value="${itemTotal}">
                                </td>
                             `;
            $('#table__items').append(addItem);
            updateCartTotal(stripDollar(itemTotal));
        }

        $('.fa-angle-left').click( (event) => {
            const index = getItemNum(event.target.id);
            const $qty = $(`#qty-${index}`);
            const $price = $(`#price-${index}`);
            const $total = $(`#total-${index}`);
            let newQty = parseInt($qty.val()) - 1;
            if(newQty >= 0)
            {
                shoppingCart[index].qty = newQty;
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
            const index = getItemNum(event.target.id);
            const $qty = $(`#qty-${index}`);
            const $price = $(`#price-${index}`);
            const $total = $(`#total-${index}`);
            let newQty = parseInt($qty.val()) + 1;

            if(newQty <= 10)
            {
                shoppingCart[index].qty = newQty;
                $qty.val(newQty);
                const newItemTotal = calcTotalPrice(stripDollar($price.val()), newQty);
                $total.val(newItemTotal);
            }
            
            if(newQty <= 10)
                updateCartTotal(stripDollar($price.val()));
            else
                updateCartTotal(0, false);
        });
    }
});

$('#button__clear-cart').click(() => {
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("cartLabel");
    shoppingCart = [];
    location.reload();
});

$('#button__cart-checkout').click(() => {
    const signedIn = localStorage.getItem("signedIn");

    if(signedIn !== null && signedIn === "true")
    {
        let prodIds = [];
        let prodQty = [];
        let prodPrice = [];

        shoppingCart.forEach(prod => {
            prodIds.push(prod.id);
            prodQty.push(prod.qty);
            prodPrice.push(stripDollar(prod.price));
        });
        
        const data = {itemCount: shoppingCart.length, userId: localStorage.getItem("__ch"), ids: prodIds, qty: prodQty, price: prodPrice};
        $.ajax({
            url:'/checkout',
            method: 'POST',
            data: data,
            datatype: 'json'
        }).done((res) => {
            if(res.success)
            {
                //if the items were successfully added to the db then remove them from the cart
                localStorage.removeItem("shoppingCart");
                localStorage.removeItem("cartLabel");
                $('.acticle__thank-you').css("opacity", "1");
                $('.acticle__thank-you').css("z-index", "1");
                //window.location.reload(); this needs to be added after the user hit ok
            }
            else
            {
                console.log('error...ajax');
            }
        });

        alert("You are checking out");
    }
    else
        alert("Please signin to checkout!");
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