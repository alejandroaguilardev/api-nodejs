const { response } = require("express");
const User = require("../model/User");
const bycrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");


const loginUser = async (req, res = response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
                if (!user) {
			return res.status(400).json({
				ok: false,
				errors: "User Incorrect",
			});
		}

        const validPassword = bycrypt.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
				ok: false,
				errors: "Password Incorrect",
			});
        }

		const token = await generateJWT(user.id, user.name);

		res.json({
			ok: true,
            uid: user.id,
			name: user.name,
			token
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "error system",
		});
	}
};

const createUser = async (req, res = response) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });

		if (user) {
			return res.status(409).json({
				ok: false,
				errors: "User Exist",
			});
		}

		user = new User(req.body);
		const salt = bycrypt.genSaltSync();
		user.password = bycrypt.hashSync(password, salt);
		await user.save();

		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "error system",
		});
	}
};

const revalToken = async(req, res = response) => {
	const {uid, name } = req;
	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		name
	});
};

module.exports = {
	loginUser,
	createUser,
	revalToken,
};
