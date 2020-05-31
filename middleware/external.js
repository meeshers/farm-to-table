exports.greeting = () => {
    console.log("From the external file!");
}

exports.formatPrice = (price) => {
    return "$" + parseFloat(price).toFixed(2);
}

exports.stripDollar = (price) => {
    return price.replace(/\$/g, '');
}

exports.getDate = (isoDate) => {
    let day = isoDate.getDate();
    let month = isoDate.getMonth()+1;
    let year = isoDate.getFullYear();

    return `${month}-${day}-${year}`;
}