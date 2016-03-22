var config = module.exports;
config.express = {
	port: process.env.EXPRESS_PORT || 3000,
	ip: "127.0.0.1"
};
config.mongodb = {
	db180: "mongodb://localhost:27017/180",
	settings: {
		native_parser: true,
		safe: true
	}
};