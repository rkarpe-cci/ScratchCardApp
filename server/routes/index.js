const userController = require('../controllers/userController')
const scratchcardController = require('../controllers').ScratchCardCon
const transactionController = require('../controllers').transCon
//const express=require('express');
//const router=require('express-promise-router')();


const { validateBody, schemas } = require('../helpers/validation');
module.exports = app => {
    //app.get('/api',(req,res)=>res.status(200).send({
    //     message:'Welcome to the Task Management System',
    // }));

    //user
    app.route('/api/CreateUser')
        .post(validateBody(schemas.userSchema), userController.create);
    //app.post('/api/CreateUser',userController.create);
    app.get('/api/getUser',userController.list);
    app.get('/api/getUserById/:UserId',userController.findById);
    app.put('/api/updateUser/:UserId',userController.update);
    app.delete('/api/deleteUser/:UserId',userController.delete);

    //scratchCards
    app.post('/api/createScratchCard', scratchcardController.create);
    app.get('/api/insertData', scratchcardController.insertData);
    app.get('/api/getUnusedCards', scratchcardController.listUnUsedCards);

    //transactions
    app.route('/api/CreateTransaction')
        .post(validateBody(schemas.authSchema), transactionController.create);
    app.get('/api/getTranscationByDate/:dateTrans', transactionController.getByDateOfTranscation);
    app.get('/api/getUserTranscation/:userId', transactionController.getTransByUser);
    app.get('/api/getTransByAmount/:amount', transactionController.getTransByAmount);

};