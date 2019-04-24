const Trans = require('../models').transactions
const scratchCard = require('../models').scratchCards
const user = require('../models').users
//var moment = require('moment');
module.exports = {
    create(req, res) {
        var date1 = new Date(req.value.body.dateofTransaction);
        Trans.findOne({
            where: {
                scratchCardId: req.value.body.scratchCardId
            }, attributes: ['amount', 'id', 'dateofTransaction'],
            include: [
                {
                    model: scratchCard, required: false,
                    attributes: ['id', 'scratched', 'scratchCardExpiryDate', 'amount'],
                    where: { scratched: 0, isactive: 1 }
                },
                {
                    model: user,
                    attributes: ['id', 'firstName'],
                    where: { id: req.value.body.uId, isactive: 1 }
                }]
        }).then(function (data) {
            if (!data) {
                scratchCard.findOne({
                    where: {
                        id: req.value.body.scratchCardId
                    }
                }).then(function (cards) {
                    Trans.findOne({
                        where: {
                            scratchCardId: req.value.body.scratchCardId
                        }
                    }).then(function (usedcards) {
                        if (!usedcards) {
                            var tAmount = cards.dataValues.amount;
                            user.findOne({
                                where: { id: req.value.body.uId, isactive: 1 }
                            }).then(function (activeUser) {
                                if (!activeUser) {
                                    res.send('user is not activated');
                                }
                                else {
                                    Trans.create(
                                        {
                                            //amount: req.value.body.amount,
                                            amount: tAmount,
                                            dateofTransaction: date1,
                                            uId: req.value.body.uId,
                                            scratchCardId: req.value.body.scratchCardId,
                                        })
                                    scratchCard.update(
                                        { isactive: 0, scratched: 1 },
                                        { where: { id: req.value.body.scratchCardId } }

                                    ).then(function (updatedCard) {
                                        res.send({ updatedCard, message: 'Transaction performed' });
                                    })
                                }
                            })

                        }
                        else {
                            res.send({ message: 'Card used by some other user' });
                        }
                    })
                }) //res.send('inside join');
            }
            else {
                res.send({ data, message: 'already used ScratchCard' });
            }
        });
    },
    getByDateOfTranscation(req, res) {
        var date1 = new Date(req.params.dateTrans);
        console.log(date1);
        var condition = {
            where:
            {
                dateofTransaction: date1
            }
        }
        return Trans
            .findAll(condition).then(Trans => {
                res.send(Trans);
            });
    },
    getTransByUser(req, res) {
        let userId = req.params.userId;
        var condition = {
            where:
            {
                uId: userId
            }
        }
        return Trans

            .findAll(condition).then(Trans => {
                res.send(Trans);
            });
    },
    getTransByAmount(req, res) {
        let amt = req.params.amount;
        var condition = {
            where:
            {
                amount: amt
            }
        }
        return Trans
            .findAll(condition).then(Trans => {
                res.send(Trans);
            });
    },
};