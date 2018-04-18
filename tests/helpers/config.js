'use strict';

require('dotenv').config();

const config = {
    address: process.env.ADDRESS_TEST || '0xcb04bd27ee21b4b8ac2f03594b2364a6ee804de5',
    nem_address: process.env.NEM_ADDRESS || 'TCJ5XRSEYZVMBZBF7TWGZPEQGI6SAJUJBUENAQDG',
    currentAmount: process.env.CURRENT_AMOUNT || 1000000,
    depositMaxAmount: process.env.DEPOSIT_MAX_AMOUNT || 1000000000000,
    amount: process.env.AMMOUNT_TEST || 1
};

module.exports = config;