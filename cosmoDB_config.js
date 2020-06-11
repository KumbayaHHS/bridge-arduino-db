const config = {
	endpoint: "https://malawi-sensing.documents.azure.com:443/", // URI
	key: "yBWJ4Nmp8e6WpfY7jFrgdGQ1DdbonOKebQ5M6M1bvpT44tKprKCTZqvbBW2GpNvbru2wKn3vYOxZBbFgBXw2ZQ==",
	databaseId: "KumbayaSensing",
	containerId: "SoilMeasurement",
	partitionKey: {kind: "Hash", paths: ["/userid"]}
};

module.exports = config;
