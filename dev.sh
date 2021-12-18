#!/bin/bash

# Load environment variables
chmod +x .env; source ./.env

# Npm install if not already
yarn

# Run migrations
migrate-mongo up

# Start nuxt
./node_modules/.bin/nest start --watch
