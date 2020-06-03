$(document).ready( () => {
    const cartLabel = localStorage.getItem("cartLabel");

    if(cartLabel !== null)
    {
        $('#a__cart').text(cartLabel);
    }
})