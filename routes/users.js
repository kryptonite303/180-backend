var express = require('express');
var router = express.Router();
var User = require('../model/users');

router.use(function(req, res, next){
	req.instance = {};
	req.instance.user = User(req.user);
	next();
});

router.get('/', function(req, res) {
	var user = req.instance.user;
	res.send(user);
	// console.log(user);
	// user.getUser(req.query, function(response){
	// 	res.send(response);
	// });
});

router.post('/add/', function(req, res) {
	var user = req.instance.user;
	user.addUser(req.body, function (err, response) {
		if (err) {
			return res.send(err);
		}
		return res.send(response);
	})
});

router.post('/remove/', function(req, res) {
	var user = req.instance.user;
	user.removeUser(req.body, function (err, response) {
		if (err) {
			return res.send(err);
		}
		return res.send(response);
	})
});

router.get('/lists/', function(req, res) {
	var user = req.instance.user;
	user.getLists(req.query, function(err, response){
		res.send(response);
	});
});

router.post('/addToList/', function(req, res) {
	var user = req.instance.user;
	user.addToMailingList(req.body, function (err, response) {
		if (err) {
			return res.send(err);
		}
		return res.send(response);
	})
});
module.exports = router;