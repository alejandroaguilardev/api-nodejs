const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

const { createUser, loginUser, revalToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validateJWT");

router.post(
	"/",
	[
		check("email", "email is obliged").not().isEmpty(),
		check("password", "password min 6").isLength({ min: 6 }),
		validateFields,
	],
	loginUser
);

router.post(
	"/new",
	[
		check("name", "name is obliged").not().isEmpty(),
		check("email", "email is obliged").not().isEmpty(),
		check("password", "password min 6").isLength({ min: 6 }),
		validateFields,
	],
	createUser
);

router.get("/renew", validateJWT, revalToken);

module.exports = router;
