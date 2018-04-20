'use strict';

const _ = require('lodash'),
    accountModel = require('../../models/accountModel'),
    blockModel = require('../../models/blockModel'),
    valueConfig = require('./config');

module.exports = async () => {
    const accounts = await accountModel.find({nem: {$ne: null}});

    const filtered = await blockModel.aggregate([
        {
          $project: {
            account: accounts
          }
        },
        {$unwind: '$account'},
        {
          $lookup: {
            from: 'sethashes',
            localField: 'account.address',
            foreignField: 'key',
            as: 'sethash'
          }
        },
        {
          $lookup: {
            from: 'deposits',
            localField: 'account.address',
            foreignField: 'who',
            as: 'deposit'
          }
        },
        {
          $project: {
            address: '$account.address',
            nem: '$account.nem',
            deposit: '$deposit',
            deposit_count: {$size: '$deposit'},
            sethash: '$sethash',
            sethash_count: {$size: '$sethash'},
            welcomeBonusSent: '$account.welcomeBonusSent',
            maxTimeDeposit: '$account.maxTimeDeposit',
            maxFoundDeposit: {$max: '$deposit.amount'},
            maxDepEq: {
              $lte: [
                {$ifNull: [{$max: '$deposit.amount'}, 0]},
                {$ifNull: [{$max: '$account.maxTimeDeposit'}, 0]}
              ]
            }
          }
        },
        {
          $match: {
            $or: [
              {sethash_count: {$gt: 0}, welcomeBonusSent: {$ne: true}},
              {deposit_count: {$gt: 0}, maxDepEq: false}
            ]
          }
        }
      ]);

    const welcomeBonusSets = _.filter(filtered, item => !item.welcomeBonusSent);
    const depositSets = _.filter(filtered, item => !item.maxDepEq);

    return {
        welcomeBonusSets: welcomeBonusSets,
        depositSets: depositSets
    }
}