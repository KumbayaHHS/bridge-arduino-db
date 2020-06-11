const config = {
	endpoint: process.env.COSMODB_ENDPOINT,
	key: process.env.COSMODB_KEY,
	databaseId: "KumbayaSensing",						// Replace with the name of the database
	containerId: "SoilMeasurement",						// Replace with the name of the collection in the database
	partitionKey: {kind: "Hash", paths: ["/userid"]}	// Replace with the partitionKey of the container
};

module.exports = config;
