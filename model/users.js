var mongo = require('mongoskin');
var config = require('../config');
var keys = require('../apiKeys');
var db = mongo.db(config.mongodb.db180, config.mongodb.settings);
var MailChimpAPI = require('mailchimp').MailChimpAPI;
var apiKey = keys.mailChimp;
var mc = new MailChimpAPI(apiKey, { version : '2.0' });
db.bind('users');

function User(user) {
	this.user = user || null;
	this.getUser = function(params, callback) {
		return callback(null, params);
	}

	this.addUser = function(params, callback) {
		var _id = params._id;
		db.users.insert({_id: _id}, function (err, res) {
			if (err) {
				return callback(err);
			}
			return callback(null, res);
		});
	}

	this.removeUser = function(params, callback) {
		var _id = params._id;
		db.users.remove({_id: _id}, function (err, res) {
			if (err) {
				return callback(err);
			}
			return callback(null, res);
		});
	}

	this.addToMailingList = function(params, callback) {
		var param = {
			id: 'dd5ddbaf5f',
			email: {
		        "email": params.email
    		}
		}
		console.log(param);
		mc.lists_subscribe(param, function (err, result) {
			if (err) {
				return callback(err);
			}
			return callback(null, result);
		});
	}

	this.getLists = function (params, callback) {
		mc.lists_list({}, function (err, result) {
			return callback(null, result);
		});
	}
}

module.exports = function(user) {
	return new User(user);
};