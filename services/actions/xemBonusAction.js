'use strict';

const bunyan = require('bunyan'),
  log = bunyan.createLogger({name: 'nemActionProcessor.xemBonusAction'}),
  config = require('../../config'),
  accountModel = require('../../models/accountModel'),
  nemServices = require('../nemServices');

module.exports = async (nemAddress, maxXemAmount, ethAddress) => {
  log.info(`NemBonus run for ${nemAddress}`);

  const balance = await nemServices.getNemBalance(nemAddress);
  if(balance - maxXemAmount > 0) {
    const transferAmount = (balance - maxXemAmount) / (config.nem.xemBonus.xemDivisibility * config.nem.xemBonus.rate);
    const result = await nemServices.makeBonusTransfer(nemAddress, transferAmount, 'Xem Bonus');
    await accountModel.findOneAndUpdate({address: ethAddress, nem: nemAddress}, {$set: {maxXemAmount: balance}});
    return result;
  }
};
