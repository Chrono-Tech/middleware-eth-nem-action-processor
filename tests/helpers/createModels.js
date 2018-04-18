'use strict';

const accountModel = require('../../models/accountModel'),
    config = require('./config');


module.exports = async () => {

    await accountModel.create({
        address: config.address,
        nem: config.nem_address
    });

};

