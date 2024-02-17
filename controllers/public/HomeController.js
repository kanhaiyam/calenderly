const UserModel = require("../../models/User.js");
const date = new Date();
const moment = require('moment-timezone');

module.exports = {
	signUp: async (req, res) => {
		/* 
		* #Request Object Specification
		obj = {
			url: req.url,
			method: req.method,
			params: req.params,
			query: req.query,
			headers: req.headers,
			body: req.body,
			cookies: req.cookies,
			ip: req.ip,
			host: req.hostname,
			proto: req.protocol,
			pat: req.path,
			xhr: req.xhr
		} */

		let newUser = {};
		newUser.authTokens = {};
		newUser.username = req.body.username;
		newUser.email = req.body.email;
		newUser.password = req.body.password;
		newUser.authTokens.token = "some string token";
		newUser.authTokens.expiry = moment().add(330, 'minutes');
		newUser.lastLogin = date;
		newUser.created = date;
		newUser.timezone = 'Asia/Kolkata';

		newUser = new UserModel(newUser);
		try {
			const dataToSave = await newUser.save();
			console.log(dataToSave);
			if (dataToSave) {
				var response = {
					message: "User created successfully!",
					data: {
						auth: dataToSave.authTokens,
						user: {
							username: dataToSave.username,
							email: dataToSave.email
						}
					}
				}
				return res.status(201).json(response);
			} else {
				console.log('Failed to create user');
				return res.status(500).json({ error: 'Failed to create user' });
			}
		}
		catch (error) {
			return res.status(400).json({ message: error.message });
		}
	},

	list :async (req, res) => {
		const users = await UserModel.find({});
        res.json(users);
	},

	home: (req, res) => {
		res.render('public/home/home');
	},

	second: (req, res) => {
		res.render('public/home/second');
	},
};