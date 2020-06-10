const {EventHubConsumerClient} = require("@azure/event-hubs");

const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./cosmoDB_config");
const dbContext = require("./data/databaseContext");

const moment = require("moment");

// Event Hub-compatible endpoint
// az iot hub show --query properties.eventHubEndpoints.events.endpoint --name {your IoT Hub name}
const eventHubsCompatibleEndpoint = "sb://iothub-ns-kumbaya-hu-3564860-2bba2f4889.servicebus.windows.net";

// Event Hub-compatible name
// az iot hub show --query properties.eventHubEndpoints.events.path --name {your IoT Hub name}
const eventHubsCompatiblePath = "kumbaya-hub";

// Primary key for the "service" policy to read messages
// az iot hub policy show --name service --query primaryKey --hub-name {your IoT Hub name}
const iotHubSasKey = "H9noa1guGa+Ru+T9biGFkLods/gZPa8YpbtvKo1hq4Q=";

// If you have access to the Event Hub-compatible connection string from the Azure portal, then
// you can skip the Azure CLI commands above, and assign the connection string directly here.
const connectionString = `Endpoint=${eventHubsCompatibleEndpoint}/;EntityPath=${eventHubsCompatiblePath};SharedAccessKeyName=service;SharedAccessKey=${iotHubSasKey}`;

let printError = function (err) {
	console.log(err.message);
};

const {endpoint, key, databaseId, containerId} = config;

const client = new CosmosClient({endpoint, key});

const database = client.database(databaseId);
const container = database.container(containerId);

let printMessages = async function (messages) {
	for (const message of messages) {

		const pH_param = parseFloat(message.body.ph_param);

		if (pH_param < 0.00 || pH_param > 14.0) {
			console.error('Invalid pH value');
			continue;
		}

		const tmp = {
			"userid": message.body.user_id,
			"measureDate": moment.unix(parseInt(message.body.create_at)).format('YYYY-MM-DD'),
			"soiltype": "",
			"nParam": message.body.n_param,
			"pParam": message.body.p_param,
			"kParam": message.body.k_param,
			"pHParam": message.body.ph_param
		};

		// Make sure the database is already setup. If not, create it.
		await dbContext.create(client, databaseId, containerId);

		// Create Item in the database.
		const {resource: createdItem} = await container.items.create(tmp);
	}
};

async function main() {
	const clientOptions = {};

	// Create the client to connect to the default consumer group of the Event Hub
	const consumerClient = new EventHubConsumerClient("$Default", connectionString, clientOptions);

	// Subscribe to messages from all partitions as below
	// To subscribe to messages from a single partition, use the overload of the same method.
	consumerClient.subscribe({
		processEvents: printMessages,
		processError: printError,
	});
}

main().catch((error) => {
	console.error("An error occur:", error);
});
