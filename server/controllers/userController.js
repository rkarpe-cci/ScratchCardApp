const User = require('../models').users
module.exports = {
    create(req, res, next) {
        return User
            .create(
                {
                    firstName: req.value.body.firstName,
                    lastName: req.value.body.lastName,
                    isActive: req.value.body.isActive,
                })
            .then(User => res.status(201).send(User))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return User
            .findAll().then(User => {
                res.send(User);
            });
    },
    update(req, res) {
        const id = req.params.UserId;
        User.update({ firstName: req.body.firstName, lastName: req.body.lastName, isActive: req.body.isActive },
            { where: { id: req.params.UserId } }
        ).then(() => {
            res.status(200).send("updated successfully a User with id = " + id);
        });
    },
    delete(req, res) {
        const id = req.params.UserId;
        User.destroy(
            {
                where: { id: id }
            }
        ).then(() => {
            res.status(200).send('deleted sucessfully user with:' + id);
        });
    },
    findById(req, res) {
        User.findByPk(req.params.UserId).then(user => {
            res.send(user);
        })
    }
};
