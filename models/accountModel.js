/** 
 * Mongoose model. Accounts
 * @module models/accountModel
 * @returns {Object} Mongoose model
 * @requires factory/accountMessageFactory
 */

const mongoose = require('mongoose'),
  config = require('../config'),
  messages = require('../factories/messages/addressMessageFactory');

require('mongoose-long')(mongoose);

const Account = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true,
    validate: [a=>  /^(0x)?[0-9a-fA-F]{40}$/.test(a), messages.wrongAddress]
  },
  balance: {type: mongoose.Schema.Types.Long, default: 0},
  created: {type: Date, required: true, default: Date.now},
  erc20token : {type: mongoose.Schema.Types.Mixed, default: {}},
  nem: {
    type: String,
    validate: [a=>  /^[0-9A-Z]{40}$/.test(a), messages.wrongAddress]
  },
  isActive: {type: Boolean, required: true, default: true},
  maxTimeDeposit: {type: mongoose.Schema.Types.Long, default: 0},
  welcomeBonusSent: {type: Boolean, default: false}
});

module.exports = mongoose.accounts.model(`${config.mongo.accounts.collectionPrefix}Account`, Account);
