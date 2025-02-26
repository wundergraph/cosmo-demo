# Cosmo Demo

This demo consists of 2 subgraphs

- posts
- users

## Running Subgraphs Locally

You can run the subgraphs with the script as shown below

Posts runs on http://localhost:4001 and users runs on http://localhost:4002

```bash
sh ./start-subgraphs.sh
```

## Running Router Locally

You can run the router locally without a connection to the control plane by executing the following commands.

1. First cd into the router directory

```bash
cd router
```

2. Next generate the router config locally by running the compose command.

```bash
wgc router compose --input graph.localhost.yaml --out config.json
```

3. Finally run the router and head over to http://localhost:3002/graphql

```bash
docker run \
  --name cosmo-router \
  --rm \
  -p 3002:3002 \
  --add-host=host.docker.internal:host-gateway \
  --platform=linux/amd64 \
  -e pull=always \
  -e DEV_MODE=true \
  -e LISTEN_ADDR=0.0.0.0:3002 \
  -e EXECUTION_CONFIG_FILE_PATH="/config/config.json" \
  -v "$(pwd)/config.json:/config/config.json" \
  ghcr.io/wundergraph/cosmo/router:latest
```

## CI/CD

GitHub actions are setup to do schema checks on pull requests and schema publish on push to main.
