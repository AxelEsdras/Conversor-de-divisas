import { exchangeRates } from './script';

function jpyToMxn(amount) { return +(amount * exchangeRates.JPY.MXN).toFixed(2); }
