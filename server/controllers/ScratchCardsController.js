const ScratchCards = require('../models').scratchCards;
var moment = require('moment');
var fs = require("fs");
module.exports = {
    create(req, res) {
        var expDate = new Date(req.body.scratchCardExpiryDate);
        return ScratchCards
            .create(
                {
                    amount: req.body.amount,
                    scratchCardExpiryDate: expDate,
                    scratched: req.body.scratched,
                    isactive: req.body.isactive
                })
            .then(ScratchCards => res.status(201).send(ScratchCards))
            .catch(error => res.status(400).send(error));
    },
    insertData(req, res) {
        console.log('insertData');
        var tenDaysAfter = moment().add(10, 'day').format('YYYY MM DD');
        var dateExp = new Date(tenDaysAfter);
        var loop = [];
        for (var x = 0; x < 30; x++) {
            var amt = Math.floor(Math.random() * x) + 1;
            loop.push({ amount: amt, scratchCardExpiryDate: dateExp, scratched: 0, isactive: 1 });
        }
        ScratchCards.update(

            { isactive: 0 },
            { where: { scratched: 0 } }

        ).then(function () {

            ScratchCards.bulkCreate(loop).then(ScratchCards => res.status(201).send(ScratchCards))

        }).catch(function (e) {
            console.log(" update failed !");
            ScratchCards.bulkCreate(loop).then(ScratchCards => res.status(201).send(ScratchCards))
        })
    },
    listUnUsedCards(req, res) {
        var condition = {
            where:
            {
                scratched: 0,
                isactive: 1
            }
        }
        return ScratchCards
            .findAll(condition).then(ScratchCards => {
                res.send(ScratchCards);
            });
    },
    getByDateOfTranscation(req, res) {
        let transDate = req.params.Date;
        var condition = {
            where:
            {
                scratched: 0
            }
        }
        return ScratchCards
            .findAll(condition).then(ScratchCards => {
                res.send(ScratchCards);
            });
    },
    getTransByUser(req, res) {
        return ScratchCards
            .findAll(condition).then(ScratchCards => {
                res.send(ScratchCards);
            });
    },
};




