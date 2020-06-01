exports.greeting = () => {
    console.log("From the external file!");
}

exports.formatPrice = (price) => {
    return "$" + parseFloat(price).toFixed(2);
}

exports.stripDollar = (price) => {
    return price.replace(/\$/g, '');
}

/**
 * @description Accepts an isoDate and returns the date.  If forDisplay(true) format is: mm-dd-yyyy. If forDisplay(false) format is: yyyy-mm-dd.
 * @param {Date} Date structure from mongodb
 * @param {Boolean} 
 * @returns {String} forDisplay(true) = 'mm-dd-yyyy'; forDisplay(false) = 'yyyy-mm-dd' 
 */
exports.getDate = (isoDate, forDisplay=false) => {
    let day = isoDate.getUTCDate();
    if(day < 10)
        day = `0${day}`;
    
    let month = isoDate.getUTCMonth()+1;
    if(month < 10)
        month = `0${month}`;
    
    let year = isoDate.getUTCFullYear();

    if(forDisplay)
        return `${month}-${day}-${year}`;
    else
        return `${year}-${month}-${day}`;
}