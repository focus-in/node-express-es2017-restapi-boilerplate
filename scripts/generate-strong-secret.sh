#!/bin/bash

if [ ! -e index.js ]
then
	echo "Error: could not find main application index.js file"
	echo "You should run the generate-ssl-certs.sh script from the main application root directory"
	echo "i.e: bash scripts/generate-ssl-certs.sh"
	exit -1
fi

echo "Generating self-strong secret..."
echo "Copy to JWT_SECRET in conf/env/.env file"
echo ""
openssl rand -base64 32
