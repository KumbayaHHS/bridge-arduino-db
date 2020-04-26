# bridge-arduino-db

bridge-arduino-db is a server, based on NodeJS, that retrieves the messages sent by the devices to the Azure IoT Hub and transfers these messages to the database.

## Table of contents

- [Setup your development environment](#I-Setup-your-development-environment)
    - [1. Installing the dependencies](#1-installing-the-dependencies)
    - [2. Create an x.509 certificate](#2-create-an-x509-certificate)
    - [3. Set environment variable](#3-set-environment-variable)

## I. Setup your development environment

### 1. Installing the dependencies  
Run the following command in your terminal:
```shell script
npm install
```

### 2. Create an x.509 certificate

- Execute the following commands to create your certificate authority first:
```shell script
mkdir certs
cd certs
/usr/share/ssl/misc/CA -newca
```

- The certificate authority is now ready to go. Let's create a certificate signing request with the following command:
```shell script
/usr/share/ssl/misc/CA -newreq
```

- Finally, sign the certificate using the certificate authority with the following command:
```shell script
/usr/share/ssl/misc/CA -sign
```

### 3. Set environment variable

You can execute the following commands in your terminal, but you will have to run these commands again each time you open a new terminal. It is therefore **recommended** to copy these commands into the source file of your shell, for example .bashrc if you are using bash.

```shell script
# String containing Hostname and Device Id in the following format:
# "HostName=<iothub_host_name>;DeviceId=<device_id>;x509=true"
export DEVICE_CONNECTION_STRING="<Your_IoT_Hub_Connection_String>"

# Path to the x509 certificate file
export PATH_TO_CERTIFICATE_FILE="<PATH_TO_CERTIFICATE_FILE>"

# Path to the x509 key file
export PATH_TO_KEY_FILE="<PATH_TO_KEY_FILE>"

# Passphrase of the certificate, if one exists
export KEY_PASSPHRASE_OR_EMPTY="<KEY_PASSPHRASE_OR_EMPTY>"
```
