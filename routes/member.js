var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var userdata;

/* Get member page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
    var uid = req.cookies.logged;
    var query = User.findOne({ '_id' : uid });
    query.select('name email money card image_url');
    query.exec(function (err, user) {
    if (err) return handleError(err);
      userdata=user;
      res.render('member', { userdata: user, title: 'member', action:'MAIN' });
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/withdraw', function(req, res, next) {
  res.render('member', { action: 'WITHDRAW', userdata: userdata, title: 'Withdraw' });
});
router.get('/deposit', function(req, res, next) {
  res.render('member', { action: 'DEPOSIT', userdata: userdata, title: 'Deposit' });
});
router.get('/logout', function(req, res, next) {
  res.clearCookie("logged");
  res.redirect('/login');
});


//function deposit_func(amount, card, money) {
//  console.log('DEPOSIT_func')
//  var newAmount = (money + amount).toString();
//  var deposit = User.updateOne(
//  { 'card' : card },
//  { $set: { 'money' : newAmount } }
//  );
//  deposit.exec(function (err, result) {
//  if (err) return handleError(err);
//    console.log(result);
//  });
//}
//  
//router.post('/transact', function(req, res, next) {
//  console.log('transact working');
//  var amount = Number(req.body.amount);
//  var card = req.body.card;
//  var action = req.body.action;
//  var money = Number(userdata.money);
//  console.log(amount+' '+card+' '+action + ' ' +money.toString());
//    if(action=='DEPOSIT'){
//      deposit_func(amount, card, money)
//    };
//    if(action=='WITHDRAW'){
//      var newAmount = parseInt(userdata.money) - parseInt(amount);
//      if(newAmount<0){res.redirect('/member'); return;}
//      var withdraw = User.updateOne(
//      { 'card' : card },
//      { $set: { 'money' : newAmount } }
//      );
//      withdraw.exec(function (err, result) {
//      if (err) return handleError(err);
//        console.log(result);
//      });
//    };
//    res.redirect('/member');
//});
module.exports = router;
