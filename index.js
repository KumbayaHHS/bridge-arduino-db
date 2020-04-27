const fs = require('fs');
const Protocol = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;

// The following environment constiable need to be set
const deviceConnectionString = process.env.DEVICE_CONNECTION_STRING;
const certFile = process.env.PATH_TO_CERTIFICATE_FILE;
const keyFile = process.env.PATH_TO_KEY_FILE;
const passphrase = process.env.KEY_PASSPHRASE_OR_EMPTY;

const options = {
	cert: fs.readFileSync(certFile, 'utf-8').toString(),
	key: fs.readFileSync(keyFile, 'utf-8').toString(),
	passphrase: passphrase
};

// Callback function for Client Object
const connectCallback = function (err) {
	if (err) {
		console.error('Could not connect: ' + err.message);
	} else {
		console.log('Client connected');

		// Read one message
		client.on('message', function (msg) {
			console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
			client.complete(msg, printResultFor('completed'));
		});

		// When an error occur print the message in the console
		client.on('error', function (err) {
			console.error(err.message);
		});

		// When a disconnection occurs, restart the connection.
		client.on('disconnect', function () {
			client.removeAllListeners();
			client.open(connectCallback);
		});
	}
};

// Helper function to print results in the console
function printResultFor(op) {
	return function printResult(err, res) {
		if (err) console.log(op + ' error: ' + err.toString());
		if (res) console.log(op + ' status: ' + res.constructor.name);
	};
}

const client = Client.fromConnectionString(deviceConnectionString, Protocol);

// Calling setOptions with the x509 certificate and key (and optionally, passphrase) will configure the client transport to use x509 when connecting to IoT Hub
client.setOptions(options);

// Start the server
client.open(connectCallback);
