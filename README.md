# bridge-arduino-db

bridge-arduino-db is a server, based on NodeJS, that retrieves the messages sent by the devices to the Azure IoT Hub and transfers these messages to the database.

## Table of contents

- [Setup your development environment](#I-Setup-your-development-environment)
    - [1. Installing the dependencies](#1-installing-the-dependencies)
    - [2. Set environment variable](#2-set-environment-variable)
    - [3. Set cosmoDB configuration](#3-set-cosmodb-configuration)

## I. Setup your development environment

### 1. Installing the dependencies  
Run the following command in your terminal:
```shell script
npm install
```

### 2. Set environment variable

You can execute the following commands in your terminal, but you will have to run these commands again each time you open a new terminal. It is therefore **recommended** to copy these commands into the source file of your shell, for example .bashrc if you are using bash.

```shell script
# Event Hub-compatible endpoint
# az iot hub show --query properties.eventHubEndpoints.events.endpoint --name {your IoT Hub name}
export EVENT_HUBS_COMPATIBLE_ENDPOINT="<VALUE_OF_THE_COMMAND_BELOW>"
```

```shell script
# Event Hub-compatible name
# az iot hub show --query properties.eventHubEndpoints.events.path --name {your IoT Hub name}
export EVENT_HUBS_COMPATIBLE_PATH="<VALUE_OF_THE_COMMAND_BELOW>"
```

```shell script
# Primary key for the "service" policy to read messages
# az iot hub policy show --name service --query primaryKey --hub-name {your IoT Hub name}
export IOT_HUB_SAS_TOKEN="<VALUE_OF_THE_COMMAND_BELOW>"
```

### 3. Set cosmoDB configuration

Fill in the fields in the cosmoDB_config.js file with the information from your Azure CosmoDB database and export the following env variable.
**You will find the information for "endpoint" and "key" in the tab "Keys" in the section "Security".**

```shell script
export COSMODB_ENDPOINT="<COSMODB_ENDPOINT>"
```

```shell script
export COSMODB_KEY="<COSMODB_KEY>"
```
