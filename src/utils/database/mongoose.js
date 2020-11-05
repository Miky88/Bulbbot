const mongoose = require("mongoose");
const Logger = require("../other/winston");

module.exports = {
	init: () => {
		const dbOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: false,
			poolSize: 5,
			connectTimeoutMS: 10000,
			family: 4,
		};

		mongoose.connect(process.env.MONGODB_URI, dbOptions);
		mongoose.set("useFindAndModify", false);
		mongoose.Promise = global.Promise;

		mongoose.connection.on("connected", () => {
			Logger.info("Mongoose has successfully connected!");
		});

		mongoose.connection.on("err", (err) => {
			Logger.error(`Mongoose connection error: \n${err.stack}`);
		});

		mongoose.connection.on("disconnected", () => {
			Logger.warn(`Mongoose connection lost`);
		});
	},
};
