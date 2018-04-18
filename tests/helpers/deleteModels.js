'use strict';

const accountModel = require('../../models/accountModel');

module.exports = async () => {
    await accountModel.remove();
}