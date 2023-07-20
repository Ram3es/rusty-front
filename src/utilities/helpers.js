const appleExpression = /Apple/i;
const safariExpression = /Safari/i;

  export const isAppleSafari = () => {
    return appleExpression.test(navigator.vendor) && 
           safariExpression.test(navigator.userAgent);
};