exports.greeting = () => {
    console.log("From the external file!");
}

exports.formatPrice = (price) => {
    return "$" + parseFloat(price).toFixed(2);
}

exports.stripDollar = (price) => {
    return price.replace(/\$/g, '');
}