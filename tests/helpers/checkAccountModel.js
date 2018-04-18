'use strict';

const accountModel = require('../../models/accountModel'),
    config = require('./config');

module.exports = async () => {
    return await accountModel.find({
        address: config.address
    });
}