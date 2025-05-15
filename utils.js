// utils.js

const exchangeRates = {
  MXN: { USD: 0.0499, CAD: 0.079, EUR: 0.053, GBP: 0.045, JPY: 8.56 },
  USD: { MXN: 20.05, CAD: 1.36, EUR: 0.93, GBP: 0.79, JPY: 151 },
  CAD: { MXN: 14.74, USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 111 },
  EUR: { MXN: 21.54, USD: 1.07, CAD: 1.47, GBP: 0.85, JPY: 162 },
  GBP: { MXN: 25.23, USD: 1.26, CAD: 1.72, EUR: 1.18, JPY: 190 },
  JPY: { MXN: 0.13, USD: 0.0066, CAD: 0.0090, EUR: 0.0061, GBP: 0.0053 }
};

function isValidEmail(email) {
    const parts = email.split('@');
    if (parts.length !== 2 || !parts[1].includes('.')) return false;
  
    const extension = parts[1].split('.').pop();
    const validExtensions = ['com', 'mx', 'es', 'net', 'org'];
    if (!validExtensions.includes(extension.toLowerCase())) return false;
  
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|mx|es|net|org)$/;
    return regex.test(email);
  }
  
  function isValidPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?_+=-]).{8,}$/;
    return regex.test(password);
  }
  
  function mxnToUsd(amount) { return +(amount * 0.0499).toFixed(2); }
  function usdToMxn(amount) { return +(amount * 20.05).toFixed(2); }
  function eurToGbp(amount) { return +(amount * 0.85).toFixed(2); }
  function jpyToCad(amount) { return +(amount * 0.009).toFixed(2); }
  function jpyToMxn(amount) { return +(amount * 0.13).toFixed(2); }
  function cadToEur(amount) { return +(amount * 0.68).toFixed(2); }
  
  module.exports = {
    isValidEmail,
    isValidPassword,
    mxnToUsd,
    usdToMxn,
    eurToGbp,
    jpyToCad,
    jpyToMxn,
    cadToEur
  };

  

