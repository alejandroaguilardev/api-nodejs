const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECT);
		console.log("DB online");
	} catch (error) {
		console.log(error);
		throw new Error("Error a las hroa de inicializar DB");
	}
};

module.exports = {
	dbConnection,
};
