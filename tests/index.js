/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Egor Zuev <zyev.egor@gmail.com>
 */

require('dotenv/config'); 

const config = require('../config'),
  Promise = require('bluebird'),
  mongoose = require('mongoose'),
  createModels = require('./helpers/createModels'),
  deleteModels = require('./helpers/deleteModels'),
  checkModel = require('./helpers/checkAccountModel'),
  welcomeBonus = require('../services/actions/welcomeBonusAction'),
  timeBonus = require('../services/actions/timeBonusAction'),
  valueConfig = require('./helpers/config'),
  expect = require('expect.js');

mongoose.Promise = Promise;
mongoose.accounts = mongoose.createConnection(config.mongo.accounts.uri);
mongoose.connect(config.mongo.data.uri, {useMongoClient: true});


describe('core/nem processor', function () {

  before(async () => {
    await createModels();
  });

  after(async () => {
    await deleteModels();
  });

  it('test welcome bonus action', async () => {
   let result =  await welcomeBonus(valueConfig.address, valueConfig.amount, valueConfig.nem_address);
   expect(result.code).to.be.equal(1);
  });

  it('test time bonus action', async () => {
    let result = await timeBonus(valueConfig.address, valueConfig.currentAmount, valueConfig.depositMaxAmount, valueConfig.nem_address);
    expect(result.code).to.be.equal(1);
  });

  it('test account status', async () => {
    let result = await checkModel();
    expect(result[0].welcomeBonusSent).to.be.equal(true);
  });
});

