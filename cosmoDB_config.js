const config = {
	endpoint: "https://kumbaya-sensing.documents.azure.com:443/", // URI
	key: "eyyr4PyeKsfCuxJHeMlb5e9WEwEtHjIXsc8pIVI8QzTiPec2ZMGYXgcl2Kl4izJ5GkVoB767WeeSHmetr5sqWw==",
	databaseId: "Tasks",
	containerId: "Items",
	partitionKey: {kind: "Hash", paths: ["/category"]}
};

module.exports = config;
