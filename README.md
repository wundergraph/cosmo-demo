# Cosmo Demo

This demo consists of 2 subgraphs

- posts
- users

## Running Subgraphs Locally

You can run each subgraph as shown below

Posts runs on http://localhost:4001 and users runs on http://localhost:4002

```bash
cd subgraph-posts && npm run dev
```

```bash
cd subgraph-users && npm run dev
```

## Running Router Locally

You can run the router locally without a connection to the control plane by executing the following commands.

1. First cd into the router directory

```bash
cd router
```

2. Next generate the router config locally by running the compose command.

```bash
wgc router compose --input graph.yaml --out config.json
```

3. Finally run the router and head over to http://localhost:3001/graphql

```bash
docker run \
    --platform=linux/amd64 \
    --name cosmo-router \
    --env-file .env.local \
    -v $(pwd)/config.json:/app/config.json \
    -p 3001:3001 \
    ghcr.io/wundergraph/cosmo/router:latest
```

## CI/CD

GitHub actions are setup to do schema checks on pull requests and schema publish on push to main.
