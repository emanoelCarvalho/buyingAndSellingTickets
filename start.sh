#!/bin/bash

# Rodar o Vue no comando dev
npm run dev &

# Rodar o json-server
npx json-server --watch db.json --port 3000
